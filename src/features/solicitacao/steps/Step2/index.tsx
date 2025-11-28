'use client';
import { useFormFunnel } from '@/context/FormProvider';
import type { FormData } from '@/types/form';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import Button from '@/components/Button';
import DateInput from '@/components/DateInput';
import MaskedField from '@/components/MaskedField';
import Notice from '@/components/Notice';
import Select from '@/components/Select';

import { api } from '@/lib/api';
import { saveStep } from '@/services/orders';

import {
  Actions,
  Callout, CalloutIcon, CalloutTitle, CheckRow,
  Col,
  Divider,
  EditLink,
  Group,
  Help,
  Label,
  Row,
  Section, SectionTitle,
  Wrap,
} from './styles';

import {
  ArrowLeftIcon, ArrowRightIcon,
  CheckCircledIcon, ExclamationTriangleIcon, InfoCircledIcon,
} from '@radix-ui/react-icons';

/* ===== Constantes ===== */
const UF_OPTIONS = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS',
  'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
].map(x => ({ label: x, value: x }));

const PASSAPORTE_STATUS = [
  { label: 'Nunca tive', value: 'nunca' },
  { label: 'Válido em minha posse', value: 'valido' },
  { label: 'Foi extraviado/roubado', value: 'extraviado' },
  { label: 'Retido pela Polícia Federal', value: 'retido_pf' },
  { label: 'Retido pelo MRE', value: 'retido_mre' },
];

const onlyDigits = (s: string) => s.replace(/\D/g, '');
const digits = (s?: string) => String(s ?? '').replace(/\D/g, '');

function mapPrevPass(v?: string) {
  const s = String(v || '').toLowerCase();
  if (s === 'nunca') return 'NEVER';
  if (s === 'valido') return 'VALID';
  if (s === 'extraviado') return 'LOST';
  if (s === 'retido_pf') return 'OTHER';   // ajuste se quiser granularizar
  if (s === 'retido_mre') return 'OTHER';
  return 'OTHER';
}

/* ===== Helpers data/idade ===== */
function parseDDMMYYYY(s?: string) {
  if (!s) return null;
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(String(s));
  if (!m) return null;
  const [_, dd, mm, yyyy] = m;
  const d = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
  return Number.isNaN(d.getTime()) ? null : d;
}
function diffYears(from: Date, to = new Date()) {
  let age = to.getFullYear() - from.getFullYear();
  const m = to.getMonth() - from.getMonth();
  if (m < 0 || (m === 0 && to.getDate() < from.getDate())) age--;
  return age;
}

// mapeia status do seu form -> enum do backend
function toPrevPassEnum(v?: string) {
  const s = (v ?? '').toLowerCase();
  if (s === 'nunca') return 'NEVER';
  if (s === 'valido') return 'VALID';
  if (s === 'extraviado') return 'LOST'; // pode ser LOST/STOLEN – ajustamos depois se preferir
  if (s === 'retido_pf' || s === 'retido_mre') return 'OTHER';
  return 'OTHER';
}

export default function Step2() {
  const { state, update, prev, next } = useFormFunnel();
  const data = state.data as any;

  // orderId via contexto ou localStorage
  const orderId =
    (state as any)?.orderId ??
    (typeof window !== 'undefined' ? localStorage.getItem('orderId') : null);

  // MaskedField: onChange aceita evento ou string
  type MFOnChange = React.FormEventHandler<HTMLInputElement> & ((value: string) => void);
  const masked = (key: keyof FormData | string): MFOnChange =>
    (((arg: any) => {
      const v = typeof arg === 'string' ? arg : arg?.target?.value;
      update({ [key]: v } as any);
    }) as unknown) as MFOnChange;

  const maskedMap = (key: keyof FormData | string, map: (s: string) => string): MFOnChange =>
    (((arg: any) => {
      const raw = typeof arg === 'string' ? arg : arg?.target?.value;
      update({ [key]: map(String(raw ?? '')) } as any);
    }) as unknown) as MFOnChange;

  // idade p/ regras condicionais
  const nasc = parseDDMMYYYY(data.nascimento);
  const idade = nasc ? diffYears(nasc) : null;
  const isMenor18 = idade !== null && idade < 18;
  const isMenor12 = idade !== null && idade < 12;

  /* ===== Validação mínima local ===== */
  const canNext = useMemo(() => {
    const cpfOk = onlyDigits(data.cpf ?? '').length === 11;
    const rgOk = (data.rgNumero ?? '').trim().length > 0;
    const emissaoOk = (data.rgEmissao ?? '').trim().length === 10; // DD/MM/AAAA
    const orgaoOk = (data.rgOrgao ?? '').trim().length > 0;
    const ufOk = (data.rgUF ?? '') !== '';
    const statusOk = (data.passaporteStatus ?? '') !== '';

    const cpfRespOk = !isMenor18 || onlyDigits(data.cpfResponsavel ?? '').length === 11;

    const exigeSerieNumero = data.passaporteStatus && data.passaporteStatus !== 'nunca';
    const serieOk = !exigeSerieNumero || /^[A-Za-z]{2}$/.test(data.passaporteSerie ?? '');
    const numeroOk = !exigeSerieNumero || /^\d{6}$/.test(onlyDigits(data.passaporteNumero ?? ''));

    const certReq = !!isMenor12;
    const certOk = !certReq || (
      data.certidaoModeloNovo
        ? true
        : (String(data.certidaoNumero ?? '').trim().length > 0 &&
          String(data.certidaoFolha ?? '').trim().length > 0 &&
          String(data.certidaoLivro ?? '').trim().length > 0)
    );

    return cpfOk && rgOk && emissaoOk && orgaoOk && ufOk && statusOk && serieOk && numeroOk && cpfRespOk && certOk;
  }, [data, isMenor12, isMenor18]);

  /* ===== Dicas por status ===== */
  const StatusHint = () => {
    switch (data.passaporteStatus) {
      case 'nunca':
        return (
          <Callout $tone="success">
            <CalloutIcon><CheckCircledIcon /></CalloutIcon>
            <div>
              <CalloutTitle>Taxa normal</CalloutTitle>
              Nenhum campo adicional necessário.
            </div>
          </Callout>
        );
      case 'valido':
        return (
          <Callout $tone="success">
            <CalloutIcon><CheckCircledIcon /></CalloutIcon>
            <div>
              <CalloutTitle>Passaporte válido</CalloutTitle>
              Informe <strong>série</strong> e <strong>número</strong> e leve o passaporte no atendimento.
            </div>
          </Callout>
        );
      case 'extraviado':
        return (
          <Callout $tone="warning">
            <CalloutIcon><ExclamationTriangleIcon /></CalloutIcon>
            <div>
              <CalloutTitle>Taxa majorada</CalloutTitle>
              Se souber, informe <strong>série/número</strong>. Pode ser necessário BO.
            </div>
          </Callout>
        );
      case 'retido_pf':
        return (
          <Callout $tone="info">
            <CalloutIcon><InfoCircledIcon /></CalloutIcon>
            <div>
              <CalloutTitle>Retido pela PF</CalloutTitle>
              <strong>Série</strong> e <strong>número</strong> são obrigatórios.
            </div>
          </Callout>
        );
      case 'retido_mre':
        return (
          <Callout $tone="info">
            <CalloutIcon><InfoCircledIcon /></CalloutIcon>
            <div>
              <CalloutTitle>Retido pelo MRE</CalloutTitle>
              Taxa normal. Preencha os campos quando aplicável.
            </div>
          </Callout>
        );
      default:
        return null;
    }
  };

  /* ===== Limpeza de condicionais ===== */
  useEffect(() => {
    if (!isMenor18 && data.cpfResponsavel) update({ cpfResponsavel: '' } as any);
    if (data.passaporteStatus === 'nunca') update({ passaporteSerie: '', passaporteNumero: '' } as any);
  }, [isMenor18, data.passaporteStatus]);

  /* ===== Integração com API ===== */

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [errGlobal, setErrGlobal] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId) return;
    let stop = false;
    const tick = async () => {
      try {
        await api.post(`/orders/${orderId}/heartbeat`, null, { params: { stepKey: 'DOCUMENT_DATA' } });
      } catch { /* ignora */ }
      if (!stop) setTimeout(tick, 45000);
    };
    tick();
    return () => { stop = true; };
  }, [orderId]);




  // monta payload do backend (DOCUMENT_DATA)
  const buildPayload = () => ({
    cpf: data.cpf ?? '',
    legalGuardianCpf: isMenor18 ? (data.cpfResponsavel ?? '') : undefined,

    idNumber: data.rgNumero ?? '',
    idIssueDate: data.rgEmissao ?? '',          // DD/MM/AAAA
    idIssuer: data.rgOrgao ?? '',
    idIssuerUF: data.rgUF ?? '',

    birthCertIsNewModel: Boolean(data.certidaoModeloNovo),
    birthCertRegistryId: data.certidaoMatricula ?? undefined,
    birthCertNumber: data.certidaoNumero ?? undefined,
    birthCertSheet: data.certidaoFolha ?? undefined,
    birthCertBook: data.certidaoLivro ?? undefined,

    previousPassportStatus: toPrevPassEnum(data.passaporteStatus),
    previousPassportNumber: data.passaporteNumero ? onlyDigits(data.passaporteNumero) : undefined,
    previousPassportSeries: data.passaporteSerie ? String(data.passaporteSerie).toUpperCase() : undefined,
  });

  useEffect(() => {
    if (!orderId) return;
    if (!data) return;

    // só autosalva se houver algo significativo
    const hasSomething =
      (data.cpf?.trim()?.length ?? 0) > 0 ||
      (data.rgNumero?.trim()?.length ?? 0) > 0;

    if (!hasSomething) return;

    const t = setTimeout(() => {
      saveStep(orderId, 'DOCUMENT_DATA', buildPayload(), false).catch(() => { });
    }, 600);

    return () => clearTimeout(t);
  }, [orderId, data]);


  async function onContinue() {
    if (!orderId) {
      setErrGlobal('Não foi possível identificar seu pedido. Recarregue a página.');
      return;
    }
    setSubmitting(true);
    setErrGlobal(null);
    try {
      await saveStep(orderId, 'DOCUMENT_DATA', buildPayload() || {}, false).catch(() => { });
      next();
    } catch (err: any) {
      const list = err?.response?.data?.errors || err?.errors;
      if (Array.isArray(list) && list.length) {
        const first = list.find((x: any) => x?.constraints)?.constraints;
        setErrGlobal(first ? String(Object.values(first)[0]) : 'Verifique os campos obrigatórios.');
      } else {
        setErrGlobal(err?.message ?? 'Erro ao salvar. Tente novamente.');
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Wrap suppressHydrationWarning>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h2>Documentos</h2>
        <span style={{ color: '#64748b', fontSize: 12 }}>Etapa 2 de 4</span>
      </div>
      <Help>Informe seus documentos de identificação para prosseguirmos.</Help>
      <Notice tone="info">Campos marcados com * são obrigatórios para continuar.</Notice>
      {errGlobal && <Notice tone="danger">{errGlobal}</Notice>}

      <Group>
        {/* ===== CPF ===== */}
        <Section>
          <SectionTitle>CPF *</SectionTitle>
          <Row>
            <Col $span={12}>
              <MaskedField
                mask="000.000.000-00"
                placeholder="000.000.000-00"
                value={data.cpf ?? ''}
                onChange={masked('cpf')}
              />
            </Col>
          </Row>

          {isMenor18 && (
            <>
              <Notice tone="info">
                <strong>CPF do responsável legal.</strong>
                <div style={{ fontSize: 14, marginTop: 6 }}>
                  Para menores de 18 anos não emancipados, é necessário informar o CPF do responsável (pais ou tutor com guarda judicial).
                </div>
              </Notice>

              <Row style={{ marginTop: 8 }}>
                <Col $span={12}>
                  <MaskedField
                    mask="000.000.000-00"
                    placeholder="CPF do responsável legal"
                    value={data.cpfResponsavel ?? ''}
                    onChange={masked('cpfResponsavel')}
                  />
                </Col>
              </Row>
            </>
          )}
        </Section>

        <Divider />

        {/* ===== Documento de Identificação ===== */}
        <Section>
          <SectionTitle>Documento de Identificação</SectionTitle>
          <Help style={{ marginTop: -6 }}>
            Número, data de emissão, órgão e UF do documento apresentado (RG, RNE, CNH, etc.).
          </Help>

          <Row>
            <Col $span={4}>
              <Label>Número</Label>
              <MaskedField
                mask={[/^[-0-9A-Za-z.]{0,20}$/]}
                placeholder="Número do documento"
                value={data.rgNumero ?? ''}
                onChange={masked('rgNumero')}
              />
            </Col>
            <Col $span={4}>
              <Label>Data de emissão</Label>
              <DateInput
                value={data.rgEmissao ?? ''}
                onChange={(v) => update({ rgEmissao: v ?? '' } as any)}
              />
            </Col>
            <Col $span={4}>
              <Label>Órgão emissor</Label>
              <MaskedField
                mask={[/^[A-Za-zÀ-ÿ\s]{0,20}$/]}
                placeholder="Ex.: SSP, DETRAN, etc."
                value={data.rgOrgao ?? ''}
                onChange={masked('rgOrgao')}
              />
            </Col>
          </Row>

          <Row>
            <Col $span={4}>
              <Label>UF de expedição</Label>
              <Select
                placeholder="Selecione o estado"
                options={UF_OPTIONS}
                value={data.rgUF ?? ''}
                onChange={(v) => update({ rgUF: v } as any)}
              />
            </Col>
          </Row>
        </Section>

        {/* ===== Certidão (menores de 12) ===== */}
        {isMenor12 && (
          <>
            <Divider />
            <Section>
              <SectionTitle>Certidão de nascimento</SectionTitle>
              <Notice tone="success">Menores de 12 anos devem apresentar a certidão de nascimento.</Notice>

              <Row style={{ marginTop: 8 }}>
                <Col $span={12}>
                  <CheckRow>
                    <input
                      type="checkbox"
                      checked={Boolean(data.certidaoModeloNovo)}
                      onChange={(e) => update({ certidaoModeloNovo: e.target.checked } as any)}
                    />
                    Certidão modelo novo? (formato unificado nacional)
                  </CheckRow>
                </Col>
              </Row>

              <Row>
                <Col $span={12}>
                  <Label>Matrícula (se existir)</Label>
                  <MaskedField
                    mask={[/^[0-9.\-\/ ]{0,35}$/]}
                    placeholder="Ex: 123456.01.55.2023.1.00001.001.0123456-89"
                    value={data.certidaoMatricula ?? ''}
                    onChange={masked('certidaoMatricula')}
                  />
                </Col>
              </Row>

              <Row>
                <Col $span={4}>
                  <Label>
                    Número {!data.certidaoModeloNovo ? '*' : ''}
                  </Label>
                  <MaskedField
                    mask={[/^[0-9A-Za-z]{0,12}$/]}
                    placeholder="Ex: 123456"
                    value={data.certidaoNumero ?? ''}
                    onChange={masked('certidaoNumero')}
                  />
                </Col>
                <Col $span={4}>
                  <Label>
                    Folha {!data.certidaoModeloNovo ? '*' : ''}
                  </Label>
                  <MaskedField
                    mask={[/^[0-9A-Za-z]{0,6}$/]}
                    placeholder="Ex: 123"
                    value={data.certidaoFolha ?? ''}
                    onChange={masked('certidaoFolha')}
                  />
                </Col>
                <Col $span={4}>
                  <Label>
                    Livro {!data.certidaoModeloNovo ? '*' : ''}
                  </Label>
                  <MaskedField
                    mask={[/^[0-9A-Za-z\-]{0,8}$/]}
                    placeholder="Ex: A-001"
                    value={data.certidaoLivro ?? ''}
                    onChange={masked('certidaoLivro')}
                  />
                </Col>
              </Row>
            </Section>
          </>
        )}

        <Divider />

        {/* ===== Passaporte anterior ===== */}
        <Section>
          <SectionTitle>Passaporte anterior</SectionTitle>
          <Help>Selecione a situação e preencha série e número quando solicitado.</Help>

          <Row>
            <Col $span={6}>
              <Select
                placeholder="Qual a situação do seu passaporte anterior? *"
                options={PASSAPORTE_STATUS}
                value={data.passaporteStatus ?? ''}
                onChange={(v) => update({ passaporteStatus: v } as any)}
              />
              <div style={{ marginTop: 10 }}>
                <StatusHint />
              </div>
            </Col>
          </Row>

          {data.passaporteStatus && data.passaporteStatus !== 'nunca' && (
            <Row>
              <Col $span={3}>
                <Label>Série (2 letras)</Label>
                <MaskedField
                  mask={[/^[A-Za-z]{0,2}$/]}
                  placeholder="AB"
                  value={data.passaporteSerie ?? ''}
                  onChange={maskedMap('passaporteSerie', (s) => s.toUpperCase())}
                />
              </Col>
              <Col $span={3}>
                <Label>Número (6 dígitos)</Label>
                <MaskedField
                  mask="000000"
                  placeholder="000000"
                  value={data.passaporteNumero ?? ''}
                  onChange={masked('passaporteNumero')}
                />
              </Col>
            </Row>
          )}
        </Section>
      </Group>

      <Actions>
        <EditLink onClick={prev}>
          <ArrowLeftIcon />
          Anterior
        </EditLink>
        <Button disabled={!canNext || submitting} onClick={onContinue}>
          {submitting ? 'Salvando…' : 'Continuar para Etapa 3'}
          <ArrowRightIcon />
        </Button>
      </Actions>
    </Wrap>
  );
}

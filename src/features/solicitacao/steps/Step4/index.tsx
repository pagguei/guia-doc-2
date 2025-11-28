'use client';
import Button from '@/components/Button';
import Notice from '@/components/Notice';
import { useFormFunnel } from '@/context/FormProvider';
import { api } from '@/lib/api';
import { saveStep } from '@/services/orders';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';

import {
  Actions,
  Card,
  CardBody,
  CardHeader, CardTitle,
  EditLink,
  Group,
  Label,
  Line,
  Value,
  Wrap,
} from './styles';

import { TermsAccordion } from '@/components/TermsAccordion';
import { TermsConfirm } from '@/components/TermsConfirm';
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';

const SEXO_LABEL: Record<string, string> = {
  masculino: 'Masculino',
  feminino: 'Feminino',
  outro: 'Não Especificado',
};
const ESTADO_CIVIL_LABEL: Record<string, string> = {
  solteiro: 'Solteiro(a)',
  casado: 'Casado(a)',
  uniao_estavel: 'União Estável',
  divorciado: 'Divorciado(a)',
  viuvo: 'Viúvo(a)',
};
const NACIONALIDADE_LABEL: Record<string, string> = {
  br: 'Brasileira',
  outra: 'Outra',
};
const PAIS_LABEL: Record<string, string> = {
  BR: 'Brasil',
  OUT: 'Outro',
};

export default function Step4() {
  const { state, update, prev, goto } = useFormFunnel();
  const data = state.data as any;
  const router = useRouter();

  const orderId =
    (state as any)?.orderId ??
    (typeof window !== 'undefined' ? localStorage.getItem('orderId') : null);

  const [triedSubmit, setTriedSubmit] = useState(false);
  const [openPanel, setOpenPanel] = useState<'' | 'terms' | 'privacy'>('');
  const [submitting, setSubmitting] = useState(false);
  const [errGlobal, setErrGlobal] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const termsAccepted = Boolean(data.termsAccepted);
  // se você tiver privacyAccepted no state, use também
  const privacyAccepted = Boolean(data.privacyAccepted);

  const canFinish = useMemo(() => termsAccepted, [termsAccepted]);

  // -------- Heartbeat (REVIEW) --------
  useEffect(() => {
    if (!orderId) return;
    let stop = false;
    const tick = async () => {
      try { await api.post(`/orders/${orderId}/heartbeat`, null, { params: { stepKey: 'REVIEW' } }); } catch { }
      if (!stop) setTimeout(tick, 45000);
    };
    tick();
    return () => { stop = true; };
  }, [orderId]);

  // -------- Autosave do(s) aceite(s) --------
  useEffect(() => {
    if (!orderId) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        await saveStep(orderId, 'REVIEW', {
          termsAccepted,
          privacyAccepted: Boolean(data.termsAccepted),
        }, false);
      } catch { /* ignora erro no autosave */ }
    }, 600);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [orderId, termsAccepted, privacyAccepted]);

  async function proceed() {
    if (!canFinish) {
      setTriedSubmit(true);
      return;
    }
    if (!orderId) {
      setErrGlobal('Não foi possível identificar seu pedido. Recarregue a página.');
      return;
    }

    setSubmitting(true);
    setErrGlobal(null);
    try {
      // grava REVIEW com completed: true (aceites finais)
      await saveStep(orderId, 'REVIEW', {
        termsAccepted,
        privacyAccepted: Boolean(data.termsAccepted),
      }, true);

      // Próxima página: seleção do processamento/pagamento
      router.push('/pagamento');
    } catch (err: any) {
      const list = err?.response?.data?.errors || err?.errors;
      if (Array.isArray(list) && list.length) {
        const first = list.find((x: any) => x?.constraints)?.constraints;
        setErrGlobal(first ? String(Object.values(first)[0]) : 'Verifique os campos obrigatórios.');
      } else {
        setErrGlobal(err?.message ?? 'Erro ao enviar. Tente novamente.');
      }
    } finally {
      setSubmitting(false);
    }
  }

  // helpers Step1
  const nomeCompleto: string = (data.nome ?? data.nomeCompleto ?? '').toString();
  const nomeSocial: string = (data.nomeSocial ?? '').toString();
  const sexoLabel = SEXO_LABEL[data.sexo as string] ?? (data.sexo ?? '');
  const nasc = (data.nascimento ?? '').toString();
  const nacionalidadeLabel = NACIONALIDADE_LABEL[data.nacionalidade as string] ?? (data.nacionalidade ?? '');
  const paisNasc = PAIS_LABEL[data.paisNascimento as string] ?? (data.paisNascimento ?? '');
  const ufNasc = (data.ufNascimento ?? '').toString();
  const cidadeNasc = (data.cidadeNascimento ?? '').toString();
  const nomeMae = (data.nomeMae ?? '').toString();
  const nomePai = (data.nomePai ?? '').toString();
  const estadoCivilLabel = ESTADO_CIVIL_LABEL[data.estadoCivil as string] ?? (data.estadoCivil ?? '');

  return (
    <Wrap suppressHydrationWarning>
      <h2>Revisão & Termos</h2>
      <Notice tone="info">Confira seus dados. Se algo estiver errado, clique em <strong>editar</strong> na respectiva seção.</Notice>
      {errGlobal && <Notice tone="danger">{errGlobal}</Notice>}

      <Group>
        {/* ====== Dados pessoais ====== */}
        <Card>
          <CardHeader>
            <CardTitle>Dados pessoais</CardTitle>
            <EditLink onClick={() => goto(1)}>Editar dados pessoais</EditLink>
          </CardHeader>
          <CardBody>
            <Line><Label>Nome completo</Label><Value $muted={!nomeCompleto}>{nomeCompleto || '—'}</Value></Line>
            {nomeSocial && (<Line><Label>Nome social</Label><Value>{nomeSocial}</Value></Line>)}
            <Line><Label>Sexo</Label><Value $muted={!sexoLabel}>{sexoLabel || '—'}</Value></Line>
            <Line><Label>Data de nascimento</Label><Value $muted={!nasc}>{nasc || '—'}</Value></Line>
            <Line><Label>Nacionalidade</Label><Value $muted={!nacionalidadeLabel}>{nacionalidadeLabel || '—'}</Value></Line>
            <Line><Label>País de nascimento</Label><Value $muted={!paisNasc}>{paisNasc || '—'}</Value></Line>
            <Line><Label>UF de nascimento</Label><Value $muted={!ufNasc}>{ufNasc || '—'}</Value></Line>
            <Line><Label>Cidade de nascimento</Label><Value $muted={!cidadeNasc}>{cidadeNasc || '—'}</Value></Line>
            <Line><Label>Nome da mãe</Label><Value $muted={!nomeMae}>{nomeMae || '—'}</Value></Line>
            {nomePai && (<Line><Label>Nome do pai</Label><Value>{nomePai}</Value></Line>)}
            <Line><Label>Estado civil</Label><Value $muted={!estadoCivilLabel}>{estadoCivilLabel || '—'}</Value></Line>
          </CardBody>
        </Card>

        {/* ====== Documentos ====== */}
        <Card>
          <CardHeader>
            <CardTitle>Documentos</CardTitle>
            <EditLink onClick={() => goto(2)}>Editar documentos</EditLink>
          </CardHeader>
          <CardBody>
            <Line><Label>CPF</Label><Value $muted={!data.cpf}>{data.cpf || '—'}</Value></Line>
            <Line><Label>Identidade</Label><Value $muted={!data.rgNumero}>{data.rgNumero || '—'}</Value></Line>
            <Line><Label>Emissão</Label><Value $muted={!data.rgEmissao}>{data.rgEmissao || '—'}</Value></Line>
            <Line><Label>Órgão / UF</Label>
              <Value $muted={!data.rgOrgao && !data.rgUF}>
                {[data.rgOrgao, data.rgUF].filter(Boolean).join(' / ') || '—'}
              </Value>
            </Line>
            <Line>
              <Label>Passaporte</Label>
              <Value $muted={!data.passaporteStatus}>
                {data.passaporteStatus && data.passaporteStatus !== 'nunca'
                  ? `${String(data.passaporteStatus).toUpperCase()}${data.passaporteSerie ? ` · Série ${data.passaporteSerie}` : ''}${data.passaporteNumero ? ` · Nº ${data.passaporteNumero}` : ''}`
                  : (data.passaporteStatus ? 'NUNCA' : '—')}
              </Value>
            </Line>
          </CardBody>
        </Card>

        {/* ====== Contato & Endereço ====== */}
        <Card>
          <CardHeader>
            <CardTitle>Contato & Endereço</CardTitle>
            <EditLink onClick={() => goto(3)}>Editar contato/endereço</EditLink>
          </CardHeader>
          <CardBody>
            <Line><Label>E-mail</Label><Value $muted={!data.email}>{data.email || '—'}</Value></Line>
            <Line><Label>Telefone</Label><Value $muted={!data.telefone}>{data.telefone || '—'}</Value></Line>
            <Line><Label>CEP</Label><Value $muted={!data.cep}>{data.cep || '—'}</Value></Line>
            <Line><Label>Logradouro</Label>
              <Value $muted={!data.enderecoLogradouro && !data.enderecoNumero}>
                {[data.enderecoLogradouro, data.enderecoNumero].filter(Boolean).join(', ') || '—'}
              </Value>
            </Line>
            {data.enderecoComplemento && (<Line><Label>Complemento</Label><Value>{data.enderecoComplemento}</Value></Line>)}
            <Line><Label>Bairro</Label><Value $muted={!data.enderecoBairro}>{data.enderecoBairro || '—'}</Value></Line>
            <Line><Label>Cidade / UF</Label>
              <Value $muted={!data.enderecoCidade && !data.enderecoUF}>
                {[data.enderecoCidade, data.enderecoUF].filter(Boolean).join(' / ') || '—'}
              </Value>
            </Line>
          </CardBody>
        </Card>

        {/* ====== Termos ====== */}
        <>
          <TermsAccordion value={openPanel} onValueChange={setOpenPanel} />

          <TermsConfirm
            checked={termsAccepted}
            onChange={(v) => update({ termsAccepted: v } as any)}
            required
            error={!termsAccepted && triedSubmit ? 'Você precisa aceitar para continuar.' : null}
            onClickTerms={() => {
              setOpenPanel('terms');
              setTimeout(() => {
                document.getElementById('terms-accordion')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }, 0);
            }}
            onClickPrivacy={() => {
              setOpenPanel('privacy');
              setTimeout(() => {
                document.getElementById('terms-accordion')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }, 0);
            }}
          />
        </>
      </Group>

      <Actions>
        <EditLink onClick={prev}>
          <ArrowLeftIcon />
          Anterior
        </EditLink>
        <Button
          disabled={!canFinish || submitting}
          onClick={() => {
            if (!canFinish) return setTriedSubmit(true);
            void proceed();
          }}
        >
          {submitting ? 'Enviando…' : 'Enviar Solicitação'}
          <ArrowRightIcon />
        </Button>
      </Actions>
    </Wrap>
  );
}

'use client';
import Button from '@/components/Button';
import MaskedField from '@/components/MaskedField';
import Notice from '@/components/Notice';
import Select from '@/components/Select';
import { useFormFunnel } from '@/context/FormProvider';
import { api } from '@/lib/api';
import { saveStep } from '@/services/orders';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import {
  Actions,
  Badge,
  Col,
  EditLink,
  ErrorText,
  Group,
  Help,
  HintText,
  Input,
  Label,
  Row,
  Wrap,
} from './styles';

/* ===== Constantes ===== */
const UF_OPTIONS = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
].map(x => ({ label: x, value: x }));

const onlyDigits = (s: string) => String(s ?? '').replace(/\D/g, '');

/* ===== ViaCEP ===== */
async function fetchViaCep(cep: string) {
  const clean = onlyDigits(cep);
  if (clean.length !== 8) throw new Error('CEP inválido');
  const res = await fetch(`https://viacep.com.br/ws/${clean}/json/`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Falha ao consultar CEP');
  const json = await res.json();
  if (json.erro) throw new Error('CEP não encontrado');
  return {
    uf: json.uf || '',
    cidade: json.localidade || '',
    logradouro: json.logradouro || '',
    bairro: json.bairro || '',
  } as const;
}

export default function Step3() {
  const { state, update, prev, next } = useFormFunnel();
  const data = state.data as any;

  // orderId do contexto, com fallback
  const orderId =
    (state as any)?.orderId ??
    (typeof window !== 'undefined' ? localStorage.getItem('orderId') : null);

  // MaskedField (evento | string)
  type MFOnChange = React.FormEventHandler<HTMLInputElement> & ((value: string) => void);
  const masked = (key: string): MFOnChange =>
    (((arg: any) => {
      const v = typeof arg === 'string' ? arg : arg?.target?.value;
      update({ [key]: v } as any);
    }) as unknown) as MFOnChange;

  const [loadingCep, setLoadingCep] = useState(false);
  const [cepError, setCepError] = useState<string | null>(null);

  /* ===== Validações leves ===== */
  const email = String(data.email ?? '').trim();
  const email2 = String(data.emailConfirm ?? '').trim();
  const emailRegex = /[^\s@]+@[^\s@]+\.[^\s@]{2,}/i;

  const emailValid = emailRegex.test(email);
  const emailMatch = emailValid && email === email2;
  const telefoneOk = onlyDigits(data.telefone).length >= 10;
  const cepDigits = onlyDigits(data.cep);
  const cepOk = cepDigits.length === 8;

  const ufOk = !!data.enderecoUF;
  const cidadeOk = !!(data.enderecoCidade ?? '').trim();
  const logradouroOk = !!(data.enderecoLogradouro ?? '').trim();
  const numeroOk = !!(data.enderecoNumero ?? '').trim();
  const bairroOk = !!(data.enderecoBairro ?? '').trim();

  const canNext = useMemo(
    () => emailMatch && telefoneOk && cepOk && ufOk && cidadeOk && logradouroOk && numeroOk && bairroOk,
    [emailMatch, telefoneOk, cepOk, ufOk, cidadeOk, logradouroOk, numeroOk, bairroOk],
  );

  async function onBlurCep() {
    const cep = String(data.cep ?? '');
    if (onlyDigits(cep).length !== 8) return;
    try {
      setLoadingCep(true);
      setCepError(null);
      const r = await fetchViaCep(cep);
      update({
        enderecoUF: r.uf,
        enderecoCidade: r.cidade,
        enderecoLogradouro: r.logradouro || data.enderecoLogradouro || '',
        enderecoBairro: r.bairro || data.enderecoBairro || '',
      } as any);
    } catch (err: any) {
      setCepError(err?.message || 'Não foi possível consultar o CEP');
    } finally {
      setLoadingCep(false);
    }
  }

  /* ===== Integração com API ===== */

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [errGlobal, setErrGlobal] = useState<string | null>(null);

  // heartbeat
  useEffect(() => {
    if (!orderId) return;
    let stop = false;
    const tick = async () => {
      try { await api.post(`/orders/${orderId}/heartbeat`, null, { params: { stepKey: 'CONTACT' } }); } catch { }
      if (!stop) setTimeout(tick, 45000);
    };
    tick();
    return () => { stop = true; };
  }, [orderId]);

  const digits = (s?: string) => String(s ?? '').replace(/\D/g, '');

  // payload CONTACT para o backend
  const buildPayload = () => {
    const rawPhone = digits(data.telefone);
    // só aceite se tiver 10 ou 11 dígitos (com DDD)
    const phone = rawPhone.length === 10 || rawPhone.length === 11 ? `+55${rawPhone}` : undefined;

    const rawCep = digits(data.cep);
    const cep = rawCep.length === 8 ? rawCep : undefined;

    const state = (data.enderecoUF || '').toString().trim().toUpperCase();
    const uf = /^[A-Z]{2}$/.test(state) ? state : undefined;

    return {
      email: data.email || undefined,
      emailConfirm: data.emailConfirm || undefined,
      phone,                 // << E.164
      cep,                   // << 8 dígitos
      street: data.enderecoLogradouro || undefined,
      number: data.enderecoNumero || undefined,
      complement: data.enderecoComplemento || undefined,
      neighborhood: data.enderecoBairro || undefined,
      city: data.enderecoCidade || undefined,
      state: uf,             // << UF 2 letras
      country: 'BR',
    };
  };

  // autosave
  useEffect(() => {
    if (!orderId) return;

    // só autosalva se houver algo significativo
    const hasSomething =
      (data.email?.trim()?.length ?? 0) > 0 ||
      (data.telefone?.trim()?.length ?? 0) > 0;

    if (!hasSomething) return;

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        setErrGlobal(null);
        await saveStep(orderId, 'CONTACT', buildPayload(), false);
      } catch {
        // ignora erro no autosave
      }
    }, 600);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [
    orderId,
    email, email2,
    data.telefone, data.cep,
    data.enderecoLogradouro, data.enderecoNumero, data.enderecoComplemento,
    data.enderecoBairro, data.enderecoCidade, data.enderecoUF,
  ]);

  async function onContinue() {
    if (!orderId) {
      setErrGlobal('Não foi possível identificar seu pedido. Recarregue a página.');
      return;
    }
    setSubmitting(true);
    setErrGlobal(null);
    try {
      await saveStep(orderId, 'CONTACT', buildPayload(), true); // validação completa
      next(); // vai para Etapa 4 (REVIEW)
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
        <h2>Contato e Endereço</h2>
        <span style={{ color: '#64748b', fontSize: 12 }}>Etapa 3 de 4</span>
      </div>
      <Help>Informe seus dados de contato e endereço. Usaremos seu e-mail para enviar o guia e atualizações.</Help>
      <Notice tone="info">Ao sair do campo CEP, tentaremos preencher cidade/UF/logradouro automaticamente.</Notice>
      {errGlobal && <Notice tone="danger">{errGlobal}</Notice>}

      {/* ===== Contato ===== */}
      <Group>
        <Row>
          <Col $span={6}>
            <Label>E-mail *</Label>
            <Input
              type="email"
              inputMode="email"
              placeholder="seu@email.com"
              value={data.email ?? ''}
              onChange={(e) => update({ email: e.target.value } as any)}
              $invalid={!!email && !emailValid}
            />
            {!emailValid && !!email && <ErrorText>Digite um e-mail válido.</ErrorText>}
          </Col>

          <Col $span={6}>
            <Label>Confirmar e-mail *</Label>
            <Input
              type="email"
              inputMode="email"
              placeholder="repita seu e-mail"
              value={data.emailConfirm ?? ''}
              onChange={(e) => update({ emailConfirm: e.target.value } as any)}
              $invalid={!!email2 && (!emailValid || email !== email2)}
            />
            {!!email2 && emailValid && email !== email2 && (
              <ErrorText>O e-mail não confere com o digitado acima.</ErrorText>
            )}
            {emailMatch && (
              <HintText>
                <Badge $tone="ok">E-mails conferem</Badge>
              </HintText>
            )}
          </Col>
        </Row>

        <Row>
          <Col $span={6}>
            <Label>Telefone *</Label>
            <MaskedField
              mask="(00) 00000-0000"
              placeholder="(11) 99999-9999"
              value={data.telefone ?? ''}
              onChange={masked('telefone')}
            />
            {!telefoneOk && !!data.telefone && <ErrorText>Informe DDD + número (ao menos 10 dígitos).</ErrorText>}
          </Col>

          <Col $span={6}>
            <Label>CEP * {loadingCep && <span style={{ fontWeight: 500 }}>&nbsp;• consultando…</span>}</Label>
            <MaskedField
              mask="00000-000"
              placeholder="00000-000"
              value={data.cep ?? ''}
              onChange={masked('cep')}
              onBlur={onBlurCep}
            />
            {cepError ? (
              <ErrorText>{cepError}</ErrorText>
            ) : (
              !!data.cep && !cepOk && <ErrorText>CEP deve ter 8 dígitos.</ErrorText>
            )}
          </Col>
        </Row>
      </Group>

      {/* ===== Endereço ===== */}
      <Group>
        <Row>
          <Col $span={8}>
            <Label>Logradouro *</Label>
            <Input
              placeholder="Rua, avenida..."
              value={data.enderecoLogradouro ?? ''}
              onChange={(e) => update({ enderecoLogradouro: e.target.value } as any)}
              $invalid={!!data.enderecoLogradouro && !logradouroOk}
            />
          </Col>
          <Col $span={4}>
            <Label>Número *</Label>
            <Input
              placeholder="123"
              value={data.enderecoNumero ?? ''}
              onChange={(e) => update({ enderecoNumero: e.target.value } as any)}
              $invalid={!!data.enderecoNumero && !numeroOk}
            />
          </Col>
        </Row>

        <Row>
          <Col $span={6}>
            <Label>Complemento (opcional)</Label>
            <Input
              placeholder="Ap., bloco, referência"
              value={data.enderecoComplemento ?? ''}
              onChange={(e) => update({ enderecoComplemento: e.target.value } as any)}
            />
          </Col>
          <Col $span={6}>
            <Label>Bairro *</Label>
            <Input
              placeholder="Bairro"
              value={data.enderecoBairro ?? ''}
              onChange={(e) => update({ enderecoBairro: e.target.value } as any)}
              $invalid={!!data.enderecoBairro && !bairroOk}
            />
          </Col>
        </Row>

        <Row>
          <Col $span={8}>
            <Label>Cidade *</Label>
            <Input
              placeholder="Cidade"
              value={data.enderecoCidade ?? ''}
              onChange={(e) => update({ enderecoCidade: e.target.value } as any)}
              $invalid={!!data.enderecoCidade && !cidadeOk}
            />
          </Col>
          <Col $span={4}>
            <Label>UF *</Label>
            <Select
              searchable
              placeholder="Selecione"
              options={UF_OPTIONS}
              value={data.enderecoUF ?? ''}
              onChange={(v) => update({ enderecoUF: v } as any)}
            />
            {!!data.enderecoUF && !ufOk && <ErrorText>Selecione a UF.</ErrorText>}
          </Col>
        </Row>
      </Group>

      <Actions>
        <EditLink onClick={prev}>
          <ArrowLeftIcon />
          Anterior
        </EditLink>
        <Button disabled={!canNext || submitting} onClick={onContinue}>
          {submitting ? 'Salvando…' : 'Continuar para Etapa 4'}
          <ArrowRightIcon />
        </Button>
      </Actions>
    </Wrap>
  );
}

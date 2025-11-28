'use client';
import Button from '@/components/Button';
import DateInput from '@/components/DateInput';
import Notice from '@/components/Notice';
import Select from '@/components/Select';
import TextField from '@/components/TextField';
import { useFormFunnel } from '@/context/FormProvider';
import { api } from '@/lib/api';
import { createDraft, saveStep } from '@/services/orders';
import type { FormData } from '@/types/form';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import {
  Col,
  Group,
  GroupDescription,
  GroupHeader, GroupTitle,
  Help,
  Label,
  Row,
  Wrap,
} from './styles';

const UF_OPTIONS = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS',
  'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
].map(x => ({ label: x, value: x }));

const ESTADO_CIVIL = [
  { label: 'Solteiro(a)', value: 'solteiro' },
  { label: 'Casado(a)', value: 'casado' },
  { label: 'União Estável', value: 'uniao_estavel' },
  { label: 'Divorciado(a)', value: 'divorciado' },
  { label: 'Viúvo(a)', value: 'viuvo' },
];

// === mapeamentos para os enums do backend ===
function toSexEnum(v?: string) {
  const s = (v ?? '').toLowerCase();
  if (s.startsWith('masc')) return 'MALE';
  if (s.startsWith('fem')) return 'FEMALE';
  if (s.startsWith('outro') || s.startsWith('nao') || s.includes('não')) return 'OTHER';
  return 'OTHER';
}
function toMaritalEnum(v?: string) {
  const s = (v ?? '').toLowerCase();
  if (s.startsWith('solt')) return 'SINGLE';
  if (s.startsWith('casad')) return 'MARRIED';
  if (s.includes('uniao') || s.includes('união')) return 'STABLE_UNION';
  if (s.startsWith('divor')) return 'DIVORCED';
  if (s.startsWith('viuv') || s.startsWith('viúv')) return 'WIDOWED';
  return 'OTHER';
}

export default function Step1() {
  // (trecho do Step1)
  const { state, update, next } = useFormFunnel();
  const data = state.data as any;

  // tenta do contexto; senão, localStorage
  const orderId =
    (state as any)?.orderId ??
    (typeof window !== 'undefined' ? localStorage.getItem('orderId') : null);

  // estado de criação do pedido
  const [creatingOrder, setCreatingOrder] = useState(!orderId);
  const [submitting, setSubmitting] = useState(false);
  const [errGlobal, setErrGlobal] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // cria o pedido se não existir
  useEffect(() => {
    if (orderId) { setCreatingOrder(false); return; }

    let cancelled = false;
    async function ensureOrder() {
      try {
        setCreatingOrder(true);
        setErrGlobal(null);

        // coleta UTM da URL e referer/fingerprint (se tiver)
        const sp = new URL(window.location.href).searchParams;
        const utmSource = sp.get('utm_source') || undefined;
        const utmMedium = sp.get('utm_medium') || undefined;
        const utmCampaign = sp.get('utm_campaign') || undefined;

        const referer = document.referrer || undefined;
        const fingerprint = localStorage.getItem('fp') || undefined;

        // cria rascunho (amount 0; atualiza no PAYMENT)
        const draft = await createDraft({
          amount: 0,
          currency: 'BRL',
          referer,
          fingerprint,
          utmSource,
          utmMedium,
          utmCampaign,
        });

        if (cancelled) return;
        localStorage.setItem('orderId', draft.id);
        // se seu FormProvider aceita, persistir no estado global:
        update({ orderId: draft.id } as any);
        setCreatingOrder(false);
      } catch (e: any) {
        if (cancelled) return;
        setErrGlobal('Não foi possível iniciar seu pedido. Recarregue a página.');
        setCreatingOrder(false);
      }
    }
    ensureOrder();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const onInput = <K extends keyof FormData>(k: K) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      update({ [k]: e.target.value } as Pick<FormData, K>);

  const onSelect = <K extends keyof FormData>(k: K) =>
    (v: string) => update({ [k]: v } as Pick<FormData, K>);

  const canNext = useMemo(() => {
    const required: (keyof FormData | string)[] = [
      'nome', 'sexo', 'nascimento', 'nacionalidade',
      'paisNascimento', 'ufNascimento', 'cidadeNascimento',
      'nomeMae', 'estadoCivil',
    ];
    return required.every((k) => (data[k] ?? '').toString().trim().length > 0);
  }, [data]);

  // monta payload do backend (PERSONAL_DATA)
  const buildPayload = () => ({
    fullName: data.nome ?? '',
    socialName: data.nomeSocial ?? undefined,
    sex: toSexEnum(data.sexo), // 'MALE' | 'FEMALE' | 'OTHER'
    birthDate: data.nascimento ?? '', // espera DD/MM/YYYY
    nationality: data.nacionalidade === 'br' ? 'Brasileira' : (data.nacionalidade ?? ''),
    birthCountry: data.paisNascimento === 'BR' ? 'Brasil' : 'Outro',
    birthState: data.ufNascimento ?? '',
    birthCity: data.cidadeNascimento ?? '',
    motherName: data.nomeMae ?? '',
    fatherName: data.nomePai ?? undefined,
    maritalStatus: toMaritalEnum(data.estadoCivil), // enum
    hasNameChanged: data.alteracaoNome === 'sim' ? true : data.alteracaoNome === 'nao' ? false : undefined,
    // previousName: data.nomeAnterior ?? undefined, // se tiver esse campo depois
  });



  // heartbeat periódico (não expõe orderId na URL)
  useEffect(() => {
    if (!orderId) return;
    let stop = false;
    const tick = async () => {
      try { await api.post(`/orders/${orderId}/heartbeat`, null, { params: { stepKey: 'PERSONAL_DATA' } }); } catch { }
      if (!stop) setTimeout(tick, 45000);
    };
    tick();
    return () => { stop = true; };
  }, [orderId]);

  // autosave com debounce quando dados mudarem
  useEffect(() => {
    if (!orderId) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        setErrGlobal(null);
        await saveStep(orderId, 'PERSONAL_DATA', buildPayload(), false);
      } catch {
        // silencioso no autosave
      }
    }, 600);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [
    orderId,
    data?.nome, data?.nomeSocial, data?.sexo, data?.nascimento, data?.nacionalidade,
    data?.paisNascimento, data?.ufNascimento, data?.cidadeNascimento,
    data?.nomeMae, data?.nomePai, data?.estadoCivil, data?.alteracaoNome,
  ]);

  async function onContinue() {
    if (!orderId) {
      setErrGlobal('Não foi possível identificar seu pedido. Recarregue a página.');
      return;
    }
    setSubmitting(true);
    setErrGlobal(null);
    try {
      await saveStep(orderId, 'PERSONAL_DATA', buildPayload(), true); // validação completa no backend
      next(); // segue para Step 2
    } catch (err: any) {
      // tenta extrair mensagens do pipe/validator
      const list = err?.response?.data?.errors || err?.errors;
      if (Array.isArray(list) && list.length) {
        // mostra a primeira mensagem mais clara como global
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
    <Wrap>
      <h2>Dados Pessoais</h2>
      <Help>Preencha seus dados básicos e o local de nascimento.</Help>
      <Notice tone="info">Campos marcados com * são obrigatórios para continuar.</Notice>
      {errGlobal && <Notice tone="danger">{errGlobal}</Notice>}

      {/* ===== Dados principais ===== */}
      <Group>
        <GroupHeader>
          <GroupTitle>Dados principais</GroupTitle>
          <GroupDescription>Identificação e informações essenciais.</GroupDescription>
        </GroupHeader>

        <Row>
          <Col $span={12}>
            <Label>Nome completo *</Label>
            <TextField
              placeholder="Digite o nome completo"
              value={data.nome ?? ''}
              onChange={onInput('nome')}
            />
          </Col>
        </Row>

        <Row>
          <Col $span={12}>
            <Label>Nome social (opcional)</Label>
            <TextField
              placeholder="Se aplica, informe o nome social"
              value={data.nomeSocial ?? ''}
              onChange={onInput('nomeSocial' as any)}
            />
          </Col>
        </Row>

        <Row>
          <Col $span={4}>
            <Label>Sexo *</Label>
            <Select
              placeholder="Selecione o sexo"
              options={[
                { label: 'Masculino', value: 'masculino' },
                { label: 'Feminino', value: 'feminino' },
                { label: 'Não Especificado', value: 'outro' },
              ]}
              value={data.sexo ?? ''}
              onChange={onSelect('sexo')}
            />
          </Col>

          <Col $span={4}>
            <Label>Data de nascimento *</Label>
            <DateInput
              value={data.nascimento ?? ''}
              onChange={(v) => update({ nascimento: v ?? '' })}
            />
          </Col>

          <Col $span={4}>
            <Label>Nacionalidade *</Label>
            <Select
              placeholder="Selecione a nacionalidade"
              options={[
                { label: 'Brasileira', value: 'br' },
                { label: 'Outra', value: 'outra' },
              ]}
              value={data.nacionalidade ?? ''}
              onChange={onSelect('nacionalidade')}
            />
          </Col>
        </Row>
      </Group>

      {/* ===== Local de nascimento ===== */}
      <Group>
        <GroupHeader>
          <GroupTitle>Local de nascimento</GroupTitle>
          <GroupDescription>País, estado e cidade, conforme documento.</GroupDescription>
        </GroupHeader>

        <Row>
          <Col $span={4}>
            <Label>País de nascimento *</Label>
            <Select
              placeholder="Selecione o país"
              options={[{ label: 'Brasil', value: 'BR' }, { label: 'Outro', value: 'OUT' }]}
              value={data.paisNascimento ?? ''}
              onChange={onSelect('paisNascimento')}
            />
          </Col>

          <Col $span={4}>
            <Label>Estado (UF) *</Label>
            <Select
              searchable
              placeholder="Selecione o estado"
              options={UF_OPTIONS}
              value={data.ufNascimento ?? ''}
              onChange={onSelect('ufNascimento')}
            />
          </Col>

          <Col $span={4}>
            <Label>Cidade de nascimento *</Label>
            <TextField
              placeholder="Cidade"
              value={data.cidadeNascimento ?? ''}
              onChange={onInput('cidadeNascimento')}
            />
          </Col>
        </Row>
      </Group>

      {/* ===== Filiação e estado civil ===== */}
      <Group>
        <GroupHeader>
          <GroupTitle>Filiação e estado civil</GroupTitle>
          <GroupDescription>Conforme certidões/documentos oficiais.</GroupDescription>
        </GroupHeader>

        <Row>
          <Col $span={6}>
            <Label>Nome da mãe *</Label>
            <TextField
              placeholder="Nome completo da mãe"
              value={data.nomeMae ?? ''}
              onChange={onInput('nomeMae' as any)}
            />
          </Col>
          <Col $span={6}>
            <Label>Nome do pai (opcional)</Label>
            <TextField
              placeholder="Nome completo do pai"
              value={data.nomePai ?? ''}
              onChange={onInput('nomePai' as any)}
            />
          </Col>
        </Row>

        <Row>
          <Col $span={6}>
            <Label>Estado civil *</Label>
            <Select
              placeholder="Selecione o estado civil"
              options={ESTADO_CIVIL}
              value={data.estadoCivil ?? ''}
              onChange={(v) => update({ estadoCivil: v } as any)}
            />
          </Col>
        </Row>
      </Group>

      {/* ===== Mudança de nome ===== */}
      <Group>
        <GroupHeader>
          <GroupTitle>Mudança de nome</GroupTitle>
          <GroupDescription>Marque somente se você já mudou o nome oficialmente.</GroupDescription>
        </GroupHeader>

        <Row>
          <Col $span={6}>
            <Label>Você mudou de nome?</Label>
            <Select
              placeholder="Selecione"
              options={[
                { label: 'Não', value: 'nao' },
                { label: 'Sim', value: 'sim' },
              ]}
              value={data.alteracaoNome ?? ''}
              onChange={onSelect('alteracaoNome')}
            />
          </Col>
        </Row>
      </Group>

      {/* Ações */}
      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
        <Button disabled={!canNext || submitting || creatingOrder} onClick={onContinue}>
          {submitting ? 'Salvando…' : 'Continuar para Etapa 2'} <ArrowRightIcon />
        </Button>
      </div>
    </Wrap>
  );
}

'use client';

import Button from '@/components/Button';
import { useFormFunnel } from '@/context/FormProvider';
import { api } from '@/lib/api';
import { saveStep } from '@/services/orders';
import { Component1Icon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import {
  Actions, Bullet, CardBody, CardHeader, CardOption, CardSubtitle, CardTitle,
  Col, Group, Help, K, PriceTag, Radio, Requirements, ResumeTable, Row,
  TotalBox, V, V2, VPositive, Wrap
} from './page.styles';

type ProcType = 'normal' | 'prioridade' | 'urgencia';

const PRECO_BASE = 257.25;          // R$ 145,00
const EXTRA_PRIORIDADE = 37;     // R$ 37,00
const EXTRA_URGENCIA = 45;       // R$ 45,00

const BRL = (n: number) =>
  n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export default function PagamentoPrimeiraVia() {
  const router = useRouter();
  const { state } = useFormFunnel();
  const data = (state.data || {}) as any;

  // orderId do contexto com fallback
  const orderId =
    (state as any)?.orderId ??
    (typeof window !== 'undefined' ? localStorage.getItem('orderId') : null);

  const [proc, setProc] = useState<ProcType>('normal');
  const [submitting, setSubmitting] = useState(false);

  const extra = useMemo(() => {
    if (proc === 'prioridade') return EXTRA_PRIORIDADE;
    if (proc === 'urgencia') return EXTRA_URGENCIA;
    return 0;
  }, [proc]);

  const total = PRECO_BASE + extra;

  // heartbeat do step PAYMENT (enquanto está nessa tela)
  useEffect(() => {
    if (!orderId) return;
    let stop = false;
    const tick = async () => {
      try { await api.post(`/orders/${orderId}/heartbeat`, null, { params: { stepKey: 'PAYMENT' } }); } catch { }
      if (!stop) setTimeout(tick, 45000);
    };
    tick();
    return () => { stop = true; };
  }, [orderId]);

  async function handleSubmit() {
    if (!orderId) {
      alert('Pedido não inicializado.');
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        plan: proc,         // 'normal' | 'prioridade' | 'urgencia'  (minúsculo)
        base: PRECO_BASE,   // number
        extra,              // number
        total,              // number
      };

      await saveStep(orderId, 'PAYMENT', payload, true);


      // 2) vai para a página do QR com orderId na URL
      router.push(`/pagamento/${orderId}`);
    } catch (e: any) {
      console.error(e);
      alert(e?.message ?? 'Erro ao gerar cobrança.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Wrap>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h2>Pagamento - Primeira Via do Passaporte</h2>
        <span style={{ color: '#64748b', fontSize: 12 }}>Escolha o tipo de processamento</span>
      </div>
      <Help>Você pode prosseguir no prazo normal (sem taxa) ou acelerar o processamento com uma taxa adicional.</Help>

      <Row>
        {/* Resumo (esquerda) */}
        <Col $span={5}>
          <Group>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>Resumo do Pedido</h3>
            <Help>Informações da solicitação</Help>

            <ResumeTable>
              <div><K>Solicitante:</K><V>{data.nome || '—'}</V></div>
              <div><K>CPF:</K><V>{data.cpf || '—'}</V></div>
              <div><K>Email:</K><V>{data.email || '—'}</V></div>
              <div><K>Telefone:</K><V>{data.telefone || '—'}</V></div>
              <div><K>Logradouro:</K><V>{data.enderecoLogradouro || '—'}</V></div>
              <div><K>Cidade/UF:</K><V>{data.enderecoCidade ? `${data.enderecoCidade} - ${data.enderecoUF || ''}` : '—'}</V></div>
              <div><K>CEP:</K><V>{data.cep || '-'}</V></div>
              <div className='separator'><K>Valor base:</K><V>{BRL(PRECO_BASE)}</V></div>
              {extra > 0 && (
                <div>
                  <V2>Taxa adicional:</V2>
                  <VPositive>{`+ ${BRL(extra)}`}</VPositive>
                </div>
              )}
            </ResumeTable>

            <TotalBox>
              <div>Valor Total:</div>
              <strong>{BRL(total)}</strong>
            </TotalBox>
          </Group>
        </Col>

        {/* Opções (direita) */}
        <Col $span={7}>
          <Group>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>Tipo de Processamento</h3>
            <Help>Escolha como deseja processar seu pedido</Help>

            {/* NORMAL */}
            <CardOption
              $active={proc === 'normal'}
              onClick={() => setProc('normal')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setProc('normal')}
            >
              <CardHeader>
                <Radio aria-checked={proc === 'normal'} data-checked={proc === 'normal'} />
                <div>
                  <CardTitle>Processamento Normal</CardTitle>
                  <CardSubtitle>Prazo padrão de processamento pela Polícia Federal</CardSubtitle>
                </div>
                <PriceTag>Sem taxa adicional</PriceTag>
              </CardHeader>
            </CardOption>

            {/* PRIORIDADE */}
            <CardOption
              $active={proc === 'prioridade'}
              onClick={() => setProc('prioridade')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setProc('prioridade')}
            >
              <CardHeader>
                <Radio aria-checked={proc === 'prioridade'} data-checked={proc === 'prioridade'} />
                <div>
                  <CardTitle>Processamento Prioridade</CardTitle>
                  <CardSubtitle>Processamento acelerado para casos específicos.</CardSubtitle>
                </div>
                <PriceTag>{`+ ${BRL(EXTRA_PRIORIDADE)}`}</PriceTag>
              </CardHeader>
              <CardBody>
                <Requirements>
                  <strong>Requisitos:</strong>
                  <ul>
                    <Bullet>Viagem inadiável em até 45 dias (vinculada a trabalho, estudo, missão oficial ou saúde no exterior)</Bullet>
                    <Bullet>Situações familiares sérias</Bullet>
                    <Bullet>Apresentar comprovação documental obrigatória</Bullet>
                    <Bullet>Viagem de turismo não é aceita</Bullet>
                  </ul>
                </Requirements>
              </CardBody>
            </CardOption>

            {/* URGÊNCIA */}
            <CardOption
              $active={proc === 'urgencia'}
              onClick={() => setProc('urgencia')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setProc('urgencia')}
            >
              <CardHeader>
                <Radio aria-checked={proc === 'urgencia'} data-checked={proc === 'urgencia'} />
                <div>
                  <CardTitle>Processamento Urgência</CardTitle>
                  <CardSubtitle>Máxima prioridade no processamento.</CardSubtitle>
                </div>
                <PriceTag>{`+ ${BRL(EXTRA_URGENCIA)}`}</PriceTag>
              </CardHeader>
              <CardBody>
                <Requirements $tone="danger">
                  <strong>Requisitos:</strong>
                  <ul>
                    <Bullet>Viagem inadiável em até 15 dias</Bullet>
                    <Bullet>Exclusivo para casos gravíssimos (doença grave ou morte de familiar, tratamento médico urgente, etc.)</Bullet>
                    <Bullet>Situações excepcionais com documentação válida</Bullet>
                    <Bullet>Apresentar comprovação documental obrigatória</Bullet>
                    <Bullet>Viagem de turismo não é aceita</Bullet>
                  </ul>
                </Requirements>
              </CardBody>
            </CardOption>

            <Actions>
              <Button style={{ width: '100%' }} onClick={handleSubmit} disabled={submitting}>
                <Component1Icon />
                {submitting ? 'Gerando cobrança…' : `Gerar Cobrança - ${BRL(total)}`}
              </Button>
            </Actions>
          </Group>
        </Col>
      </Row>
    </Wrap>
  );
}

'use client';

import Notice from '@/components/Notice';
import QrCodeApple from '@/components/QrCodeApple';
import { api } from '@/lib/api';
import { createPixIntent, getPayment, PaymentDTO } from '@/services/payments';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import {
  Amount,
  Callout, CalloutIcon,
  CalloutText,
  CalloutTitle,
  Card,
  CodeMono,
  Col,
  CopyBtn,
  Divider,
  InlineActions,
  Muted,
  PixCodeBox,
  QRWrap,
  Row,
  Small,
  Spinner,
  StatusPill,
  StatusRow,
  StepItem, StepNum,
  StepsWrap,
  SuccessBadge,
  SuccessBar,
  SuccessTitle,
  TimeBar, TimeBarFill,
  TimerText,
  Wrap
} from './page.styles';

type PixPayload = {
  amount: number;
  code: string;
  qrBase64?: string;
  expiresAt?: string;
  payeeName?: string;
  payeeDoc?: string;
  institution?: string;
};

const BRL = (n: number) =>
  (n ?? 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

/** Extrai os campos que a UI usa, criando expiresAt (60min) se não vier do provedor */
function extractPix(metadata: any, amount: number): PixPayload | null {
  if (!metadata) return null;

  const code =
    metadata.code ??
    metadata.pixCode ??
    metadata.qrCode ??
    metadata.copiaECola ??
    metadata.paymentUrl;

  const qrBase64 =
    metadata.qrBase64 ??
    metadata.qr_image_base64 ??
    metadata.imageBase64;

  // tenta pegar do provedor; se não tiver, usa createdAt + 60min
  let expiresAt: string | undefined =
    metadata.expiresAt ??
    metadata.expiration ??
    metadata.expira_em;

  if (!expiresAt && metadata.createdAt) {
    const base = new Date(metadata.createdAt).getTime();
    expiresAt = new Date(base + 60 * 60 * 1000).toISOString(); // +60min
  }

  const payeeName = metadata.payeeName ?? metadata.titular ?? metadata.beneficiario ?? 'BRASIL TRANSAÇÕES CERTAS LTDA';
  const payeeDoc = metadata.payeeDoc ?? metadata.document ?? metadata.cnpj ?? metadata.cpf ?? '';
  const institution = metadata.institution ?? metadata.instituicao ?? 'HYPER WALLET IP LTDA';

  if (!code) return null;
  return { amount, code, qrBase64, expiresAt, payeeName, payeeDoc, institution };
}

/** Storage helpers */
const lsKey = (orderId: string) => `pixPayment:${orderId}`;
type StoredPaymentRef = { paymentId: string; createdAt: string };

export default function PixPage() {
  const { orderId } = useParams() as { orderId: string };
  const router = useRouter();

  const [payment, setPayment] = useState<PaymentDTO | null>(null);
  const [pix, setPix] = useState<PixPayload | null>(null);
  const [status, setStatus] = useState<'loading' | 'pending' | 'paid' | 'failed'>('loading');

  // flags de UX
  const [creating, setCreating] = useState(false);  // loader quando cria nova intent
  const [checking, setChecking] = useState(false);  // “Verificando pagamento” durante polling

  // Evita efeitos duplicados (StrictMode dev)
  const initRef = useRef(false);

  /** Verifica se o payment é reaproveitável (status PENDING + < 60min) */
  function canReusePayment(p: PaymentDTO | null): boolean {
    if (!p || p.status !== 'PENDING') return false;
    const meta = (p as any)?.metadata ?? {};
    const createdAt: string | undefined = meta.createdAt;
    const created = createdAt ? new Date(createdAt).getTime() : null;

    const now = Date.now();
    if (created && now - created < 60 * 60 * 1000) return true;

    // fallback: se não houver createdAt no metadata, tenta do localStorage
    try {
      const raw = localStorage.getItem(lsKey(orderId));
      if (raw) {
        const stored: StoredPaymentRef = JSON.parse(raw);
        const t = new Date(stored.createdAt).getTime();
        if (now - t < 60 * 60 * 1000) return true;
      }
    } catch { }
    return false;
  }

  /** Salva referência local para reuso */
  function storePaymentRef(orderId: string, p: PaymentDTO) {
    const createdAt =
      ((p as any)?.metadata?.createdAt as string | undefined) ??
      new Date().toISOString();

    const ref: StoredPaymentRef = { paymentId: p.id, createdAt };
    try { localStorage.setItem(lsKey(orderId), JSON.stringify(ref)); } catch { }
  }

  /** Tenta resgatar paymentId do localStorage e reaproveitar */
  async function tryReuseFromStorage(orderId: string): Promise<PaymentDTO | null> {
    try {
      const raw = localStorage.getItem(lsKey(orderId));
      if (!raw) return null;
      const { paymentId } = JSON.parse(raw) as StoredPaymentRef;
      if (!paymentId) return null;
      const p = await getPayment(paymentId);
      return p ?? null;
    } catch {
      return null;
    }
  }

  /** Cria nova intent (com loader), seta estado e armazena referência local */
  async function createNewIntent(orderId: string): Promise<PaymentDTO> {
    setCreating(true);
    try {
      const p = await createPixIntent(orderId);
      setPayment(p);
      setStatus(p.status === 'PAID' ? 'paid' : p.status === 'FAILED' ? 'failed' : 'pending');
      const parsed = extractPix((p as any).metadata, (p as any).amount);
      if (parsed) setPix(parsed);
      storePaymentRef(orderId, p);
      return p;
    } finally {
      setCreating(false);
    }
  }

  /** Garante que temos um payment válido: tenta reusar, senão cria */
  async function ensurePayment(orderId: string) {
    // 1) tenta reusar do localStorage
    const reused = await tryReuseFromStorage(orderId);
    if (reused && canReusePayment(reused)) {
      setPayment(reused);
      setStatus(reused.status === 'PAID' ? 'paid' : reused.status === 'FAILED' ? 'failed' : 'pending');
      const parsed = extractPix((reused as any).metadata, (reused as any).amount);
      if (parsed) setPix(parsed);
      return;
    }
    // 2) senão, cria nova intent
    await createNewIntent(orderId);
  }

  // Montagem: garante um payment usável (reuso <1h ou cria novo)
  useEffect(() => {
    if (!orderId) return;
    if (initRef.current) return;
    initRef.current = true;

    (async () => {
      try {
        await ensurePayment(orderId);
      } catch (e) {
        console.error(e);
        setStatus('failed');
      }
    })();
  }, [orderId]);

  // ===== Polling estável (um loop por vez) =====
  const pollRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const paymentId = payment?.id ?? null;

  useEffect(() => {
    // Cancela se não tem pagamento ou já finalizou
    if (!paymentId || status !== 'pending') {
      if (pollRef.current) {
        clearTimeout(pollRef.current);
        pollRef.current = null;
      }
      return;
    }

    // Não inicia outro loop se já existe um timeout agendado
    if (pollRef.current) return;

    let active = true;

    const tick = async () => {
      setChecking(true);
      try {
        const fresh = await getPayment(paymentId);
        if (!active) return;

        // Atualiza payment (para manter amount/metadata em sincronia)
        setPayment(fresh);

        // Atualiza info de PIX, se houver metadados
        if ((fresh as any).metadata) {
          const parsed = extractPix((fresh as any).metadata, (fresh as any).amount);
          if (parsed) setPix(parsed);
        }

        if (fresh.status === 'PAID') {
          setStatus('paid');
          if (pollRef.current) { clearTimeout(pollRef.current); pollRef.current = null; }
          return;
        }
        if (fresh.status === 'FAILED') {
          setStatus('failed');
          if (pollRef.current) { clearTimeout(pollRef.current); pollRef.current = null; }
          return;
        }

        // Continua o polling
        pollRef.current = setTimeout(tick, 8000);
      } catch {
        // pequeno backoff
        pollRef.current = setTimeout(tick, 9000);
      } finally {
        setChecking(false);
      }
    };

    // Inicia o loop
    tick();

    return () => {
      active = false;
      if (pollRef.current) {
        clearTimeout(pollRef.current);
        pollRef.current = null;
      }
    };
  }, [paymentId, status]);

  // ===== Heartbeat (a cada ~45s) =====
  const hbRef = useRef(false);
  useEffect(() => {
    if (!orderId) return;
    if (hbRef.current) return;
    hbRef.current = true;

    let stop = false;
    const tick = async () => {
      try { await api.post(`/orders/${orderId}/heartbeat`, null, { params: { stepKey: 'PAYMENT' } }); } catch { }
      if (!stop) setTimeout(tick, 45000);
    };
    tick();
    return () => { stop = true; };
  }, [orderId]);

  // ===== Timer: usa expiresAt (ou 1h fallback já criado no extractPix) =====
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [remaining, setRemaining] = useState(0);
  const [totalSecs, setTotalSecs] = useState(3600);

  useEffect(() => {
    if (!mounted || !pix) return;
    const ms = pix.expiresAt
      ? (+new Date(pix.expiresAt) - Date.now())
      : (60 * 60 * 1000); // fallback de 1h

    const secs = Math.max(0, Math.floor(ms / 1000));
    setRemaining(secs);
    setTotalSecs(secs || 3600);
    const id = setInterval(() => setRemaining(s => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [mounted, pix?.expiresAt, !!pix]);

  const mm = String(Math.floor(remaining / 60)).padStart(2, '0');
  const ss = String(remaining % 60).padStart(2, '0');
  const pct = Math.max(0, Math.min(100, (remaining / (totalSecs || 1)) * 100));

  // ===== Copiar código =====
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      if (pix?.code) {
        await navigator.clipboard.writeText(pix.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }
    } catch { }
  }

  // Caixa clicável
  const codeRef = useRef<HTMLPreElement | null>(null);
  const onClickCode = async () => {
    try {
      const sel = window.getSelection();
      const range = document.createRange();
      if (codeRef.current) {
        range.selectNodeContents(codeRef.current);
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
      await copy();
    } catch { }
  };

  // Compartilhar / WhatsApp
  async function sharePix() {
    const text = `Código PIX: ${pix?.code ?? ''}`;
    if (navigator.share) {
      try { await navigator.share({ title: 'PIX - Guia do Documento', text }); return; } catch { }
    }
  }

  // Baixar QR em PNG (a partir do SVG do QrCodeApple)
  async function downloadQR() {
    const container = document.getElementById('qr-container');
    if (!container) return;
    const svg = container.querySelector('svg');
    if (!svg) return;
    const xml = new XMLSerializer().serializeToString(svg);
    const svgUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(xml);
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.src = svgUrl;
    await new Promise((res) => (img.onload = res as any));
    const size = 1024;
    const canvas = document.createElement('canvas');
    canvas.width = size; canvas.height = size;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);
    ctx.drawImage(img, 0, 0, size, size);
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'qr-pix.png';
    a.click();
  }

  // Regerar cobrança manualmente (ou quando expira)
  async function regenerate() {
    if (!orderId) return;
    const p = await createNewIntent(orderId);
    // já atualiza localStorage e estados dentro de createNewIntent
  }

  const amount = pix?.amount ?? (payment as any)?.amount ?? 0;

  const showLoader =
    creating || status === 'loading' || (!pix?.code && !payment);

  return (
    <Wrap>
      {creating && (
        <div id="app-loader" aria-live="polite" aria-busy="true">
          <div className="passport-loader">
            <Image src="/passport.svg" alt="Passaporte" width={120} height={120} />
            <div className="plane">
              <Image src="/plane.svg" alt="Avião" width={60} height={60} />
            </div>
          </div>
          <span className="loader-text">Carregando…</span>
        </div>
      )}

      <h2>Pagamento - Primeira Via do Passaporte</h2>
      <Muted>Finalize seu pagamento via PIX</Muted>

      <Card>
        <SuccessBar>
          <div className='successInfo'>
            <SuccessBadge aria-hidden="true">
              <svg viewBox="0 0 24 24" aria-hidden>
                <path fill="currentColor" d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2m-1 15l-5-5l1.41-1.41L11 13.17l6.59-6.59L19 8z" />
              </svg>
            </SuccessBadge>
            <div className="info">
              <SuccessTitle>Quase pronto!</SuccessTitle>
              <Muted>Pague <Amount>{BRL(amount)}</Amount> para iniciar seu processo de passaporte</Muted>
            </div>
          </div>
        </SuccessBar>

        <StatusRow>
          <StatusPill role="status" aria-live="polite">
            {status === 'pending' && <Spinner aria-hidden="true" />}
            {status === 'pending' && (checking ? 'Verificando Pagamento' : 'Aguardando Pagamento')}
            {status === 'paid' && 'Pagamento confirmado 🎉'}
            {status === 'failed' && 'Pagamento não concluído'}
          </StatusPill>

          <div style={{ display: 'grid', gap: 6, justifyItems: 'end' }}>
            <TimerText role="timer" aria-live="polite">
              <div>Expira em: <strong suppressHydrationWarning>{mounted && pix ? `${mm}:${ss}` : '--:--'}</strong></div>
            </TimerText>
            <TimeBar aria-hidden="true">
              <TimeBarFill $pct={pix ? pct : 0} />
            </TimeBar>
          </div>
        </StatusRow>

        <Row>
          <Col>
            <h3 style={{ textAlign: 'center', margin: '8px 0 16px' }}>Instruções de pagamento</h3>

            <StepsWrap>
              <StepItem><StepNum>1</StepNum>Acesse seu Internet Banking ou app de pagamentos.</StepItem>
              <StepItem><StepNum>2</StepNum>Escolha pagar via Pix.</StepItem>
              <StepItem><StepNum>3</StepNum>Cole o código abaixo ou escaneie o QR Code.</StepItem>
            </StepsWrap>

            <QRWrap>
              <div id="qr-container">
                {!!(pix?.code) && <QrCodeApple value={pix.code} size={320} />}
              </div>
              <Small>Escaneie o QR Code com o app do seu banco</Small>

              <InlineActions>
                <button onClick={downloadQR} aria-label="Baixar QR em PNG">Baixar QR</button>
                <button onClick={sharePix} aria-label="Enviar código PIX">Enviar para celular</button>
              </InlineActions>
            </QRWrap>

            <PixCodeBox onClick={onClickCode} title="Clique para copiar">
              <CodeMono ref={codeRef}>{pix?.code ?? 'Gerando código PIX…'}</CodeMono>
            </PixCodeBox>

            <CopyBtn onClick={copy} aria-live="polite" disabled={!pix?.code}>
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
                <path fill="currentColor" d="M16 1H4a2 2 0 0 0-2 2v12h2V3h12z" /><path fill="currentColor" d="M20 5H8a2 2 0 0 0-2 2v14h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2m0 16H8V7h12z" />
              </svg>
              {pix?.code ? (copied ? 'Copiado!' : 'Copiar Código PIX') : 'Aguardando código…'}
            </CopyBtn>

            <Divider />

            {/* <Callout role="note" aria-label="Informações do pagamento PIX">
              <CalloutIcon aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M11 17l-4-4 1.4-1.4L11 14.2l4.6-4.6L17 11z" />
                </svg>
              </CalloutIcon>
              <div>
                <CalloutTitle>Dados do pagamento PIX</CalloutTitle>
                <CalloutText>
                  <strong>Titular:</strong> {pix?.payeeName ?? '—'}{pix?.payeeDoc ? ` • ${pix.payeeDoc}` : ''}<br />
                  {pix?.institution ? ` Instituição: ${pix.institution}.` : ''}
                </CalloutText>
              </div>
            </Callout> */}

            {status === 'failed' && (
              <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 16, marginBottom: 16 }}>
                <button onClick={regenerate}>Gerar nova cobrança</button>
                <button onClick={() => router.push('/checkout')}>Voltar</button>
              </div>
            )}

            <Notice tone="info">
              Iniciaremos o seu processo assim que reconhecermos o pagamento.
            </Notice>
          </Col>
        </Row>
      </Card>
    </Wrap>
  );
}

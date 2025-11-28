import { createPixIntent, getPayment } from '@/services/payments';
import { useEffect, useRef, useState } from 'react';

export function usePixPayment(orderId: string) {
  const [payment, setPayment] = useState<any | null>(null);
  const [status, setStatus] = useState<'idle'|'pending'|'paid'|'failed'>('idle');
  const pollRef = useRef<any>(null);

  const start = async () => {
    const p = await createPixIntent(orderId);
    setPayment(p);
    setStatus(p.status === 'PAID' ? 'paid' : 'pending');
  };

  // polling
  useEffect(() => {
    if (!payment || status !== 'pending') return;
    const poll = async () => {
      try {
        const fresh = await getPayment(payment.id);
        setPayment(fresh);
        if (fresh.status === 'PAID') setStatus('paid');
        else if (fresh.status === 'FAILED') setStatus('failed');
        else pollRef.current = setTimeout(poll, 3000);
      } catch {
        pollRef.current = setTimeout(poll, 4000);
      }
    };
    poll();
    return () => pollRef.current && clearTimeout(pollRef.current);
  }, [payment, status]);

  return { payment, status, start };
}

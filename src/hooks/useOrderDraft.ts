import { createDraft, getOrder } from '@/services/orders';
import { useEffect, useState } from 'react';

const ORDER_KEY = 'orderId';

export function useOrderDraft(amount = 199.9) {
  const [orderId, setOrderId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let id = typeof window !== 'undefined' ? localStorage.getItem(ORDER_KEY) : null;
      if (id) {
        try {
          const order = await getOrder(id);
          if (['EXPIRED', 'CANCELLED'].includes(order.status)) id = null;
        } catch { id = null; }
      }
      if (!id) {
        const draft = await createDraft({ amount, currency: 'BRL', referer: document.referrer });
        id = draft.id;
        localStorage.setItem(ORDER_KEY, id);
      }
      setOrderId(id);
      setLoading(false);
    })();
  }, [amount]);

  return { orderId, loading };
}

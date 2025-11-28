import type { StepKey } from '@/services/orders';
import { heartbeat } from '@/services/orders';
import { useEffect } from 'react';

export function useHeartbeat(orderId: string, stepKey?: StepKey, intervalMs = 45000) {
  useEffect(() => {
    let stop = false;
    const tick = async () => {
      try { await heartbeat(orderId, stepKey); } catch {}
      if (!stop) setTimeout(tick, intervalMs);
    };
    tick();
    return () => { stop = true; };
  }, [orderId, stepKey, intervalMs]);
}

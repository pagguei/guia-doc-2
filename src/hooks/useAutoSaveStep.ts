import type { StepKey } from '@/services/orders';
import { saveStep } from '@/services/orders';
import { useCallback, useRef } from 'react';

export function useAutosaveStep(orderId: string, stepKey: StepKey, delay = 600) {
  const t = useRef<ReturnType<typeof setTimeout> | null>(null);

  const autosave = useCallback((data: any) => {
    if (t.current) clearTimeout(t.current);
    t.current = setTimeout(() => { void saveStep(orderId, stepKey, data, false); }, delay);
  }, [orderId, stepKey, delay]);

  const complete = useCallback(async (data: any) => {
    if (t.current) clearTimeout(t.current);
    await saveStep(orderId, stepKey, data, true);
  }, [orderId, stepKey]);

  return { autosave, complete };
}

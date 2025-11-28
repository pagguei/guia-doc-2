import { api } from '@/lib/api';

export type StepKey = 'PERSONAL_DATA' | 'DOCUMENT_DATA' | 'CONTACT' | 'REVIEW' | 'PAYMENT';


export type CreateDraftResp = { id: string };

export async function createDraft(payload: {
  amount: number;           // pode ser 0 agora; você atualiza na etapa PAYMENT
  currency?: 'BRL';
  fingerprint?: string;
  referer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}): Promise<CreateDraftResp> {
  const { data } = await api.post<CreateDraftResp>('/orders/draft', payload);
  return data;
}

export async function saveStep(
  orderId: string,
  stepKey: 'PERSONAL_DATA'|'DOCUMENT_DATA'|'CONTACT'|'REVIEW'|'PAYMENT',
  data: any = {},                  // <- nunca undefined
  completed = false
) {
  return api.patch(`/orders/${orderId}/steps`, {
    stepKey,
    data: data ?? {},               // <- garante objeto
    completed: Boolean(completed),  // <- boolean
  });
}


export async function heartbeat(orderId: string, stepKey?: StepKey) {
  await api.post(`/orders/${orderId}/heartbeat`, null, { params: { stepKey } });
}

export async function getOrder(orderId: string) {
  const { data } = await api.get(`/orders/${orderId}`);
  return data;
}


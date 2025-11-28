import { api } from '@/lib/api';

export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED';

export type PaymentDTO = {
  id: string;
  orderId: string;
  status: PaymentStatus;
  amount: number;                 // <- faltava isso no seu tipo
  metadata?: any;
  providerIntentId?: string | null;
};

// cria intent PIX
export async function createPixIntent(orderId: string): Promise<PaymentDTO> {
  const { data } = await api.post<PaymentDTO>('/payments/intent', { orderId, method: 'PIX' }); // <- endpoint singular
  // se o back mandar amount como string/Decimal, normaliza pra número:
  return { ...data, amount: typeof data.amount === 'string' ? Number(data.amount) : data.amount };
}

// consulta pagamento
export async function getPayment(paymentId: string): Promise<PaymentDTO> {
  const { data } = await api.get<PaymentDTO>(`/payments/${paymentId}`);
  return { ...data, amount: typeof data.amount === 'string' ? Number(data.amount) : data.amount };
}

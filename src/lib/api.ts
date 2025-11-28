import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'https://guia-do-documento-api-production.up.railway.app',
  timeout: 12000,
});

export type PaymentDTO = {
  id: string;
  orderId: string;
  status: 'PENDING' | 'PAID' | 'FAILED';
  amount: number;                    // <- NECESSÁRIO
  metadata?: any;
  providerIntentId?: string | null;
};

// criar intent PIX
export async function createPixIntent(orderId: string): Promise<PaymentDTO> {
  const { data } = await api.post('/payments/intent', { orderId, method: 'PIX' });
  return data as PaymentDTO;
}

// consultar pagamento por id
export async function getPayment(id: string): Promise<PaymentDTO> {
  const { data } = await api.get(`/payments/${id}`);
  return data as PaymentDTO;
}


// interceptors opcionais
api.interceptors.response.use(
  (r) => r,
  (err) => {
    // normaliza erros do Nest
    const msg = err.response?.data?.message || err.message;
    return Promise.reject(new Error(Array.isArray(msg) ? msg.join(', ') : msg));
  },
);



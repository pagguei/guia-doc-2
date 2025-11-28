export type Step = 1 | 2 | 3 | 4;

export type FormData = {
  // Etapa 1
  nome?: string;
  sexo?: 'masculino' | 'feminino' | 'outro';
  nascimento?: string;
  nacionalidade?: string;
  paisNascimento?: string;
  ufNascimento?: string;
  cidadeNascimento?: string;

  // Etapa 2
  cpf?: string;
  rgNumero?: string;
  rgEmissao?: string;
  rgOrgao?: string;
  rgUF?: string;
  passaporteStatus?: string;
  passaporteSerie?: string;
  passaporteNumero?: string;
  alteracaoNome?: 'sim' | 'nao';

  // Etapa 3
  profissao?: string;
  email?: string;
  emailConfirm?: string;
  telefone?: string;
  cep?: string;
  uf?: string;
  cidade?: string;
  logradouro?: string;
  bairro?: string;
  numero?: string;
  complemento?: string;

  // Geral
  aceiteTermos?: boolean;
  aceitePrivacidade?: boolean;
};

export type FunnelState = {
  step: Step;
  data: FormData;
  invoiceCode?: string;   // código/fatura para recuperação posterior
};

export interface CnpjData {
  status: string;
  message?: string;
  cnpj: string;
  tipo: string;
  abertura: string;
  nome: string; // Razão Social
  fantasia: string;
  natureza_juridica: string;
  logradouro: string;
  numero: string;
  complemento: string;
  cep: string;
  bairro: string;
  municipio: string;
  uf: string;
  email: string;
  telefone: string;
  efr: string; // Ente federativo responsável
  situacao: string;
  data_situacao: string;
  motivo_situacao: string;
  atividade_principal: {
    text: string;
    code: string;
  }[];
  atividades_secundarias: {
    text: string;
    code: string;
  }[];
  qsa: {
    nome: string;
    qual: string;
  }[];
  capital_social: string;
}

export interface ApiError {
  message: string;
}
import { CnpjData } from '../types';

// ReceitaWS Public API limit: 3 requests per minute.
// Since this is a browser-only demo, we use a CORS proxy to bypass browser restrictions.
// In a real production app, this should be proxied via your own backend.
const BASE_URL = 'https://www.receitaws.com.br/v1/cnpj';
const PROXY_URL = 'https://api.allorigins.win/get?url=';

export const fetchCnpjData = async (cnpj: string): Promise<CnpjData> => {
  // Remove non-numeric characters
  const cleanCnpj = cnpj.replace(/[^\d]/g, '');

  if (cleanCnpj.length !== 14) {
    throw new Error('CNPJ inválido. Digite 14 números.');
  }

  try {
    const targetUrl = `${BASE_URL}/${cleanCnpj}`;
    const response = await fetch(`${PROXY_URL}${encodeURIComponent(targetUrl)}`);

    if (!response.ok) {
      throw new Error('Erro ao conectar com o servidor.');
    }

    const proxyData = await response.json();
    const data: CnpjData = JSON.parse(proxyData.contents);

    if (data.status === 'ERROR') {
      throw new Error(data.message || 'CNPJ não encontrado ou inválido.');
    }

    return data;
  } catch (error: any) {
    // Handle the specific "Too Many Requests" logic if strictly using the API directly,
    // but generic error handling is safer for the proxy wrapper.
    throw new Error(error.message || 'Erro ao buscar dados. Tente novamente em instantes.');
  }
};
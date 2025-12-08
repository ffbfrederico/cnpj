import React, { useState } from 'react';
import { Search, ArrowLeft } from 'lucide-react';
import { CnpjData } from './types';
import { fetchCnpjData } from './services/receitaService';
import { ResultDisplay } from './components/ResultDisplay';

// Mask helper
const maskCnpj = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
};

const App: React.FC = () => {
  const [inputCnpj, setInputCnpj] = useState('');
  const [data, setData] = useState<CnpjData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCnpj) return;

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const result = await fetchCnpjData(inputCnpj);
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNewSearch = () => {
    setData(null);
    setInputCnpj('');
    setError(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputCnpj(maskCnpj(e.target.value));
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans flex flex-col items-center py-8 px-4">
      
      {/* Container for the tool */}
      <div className="w-full max-w-6xl">
        
        {data ? (
          <div>
            <button 
              onClick={handleNewSearch}
              className="mb-6 flex items-center text-gray-600 hover:text-[#E80070] font-medium text-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1" /> Realizar nova consulta
            </button>
            <ResultDisplay data={data} />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center animate-fade-in pt-12">
            
            {/* Search Card */}
            <div className="bg-white rounded-[20px] shadow-lg p-8 md:p-12 w-full max-w-3xl text-center border border-gray-100">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 tracking-tight">
                Consulta de CNPJ
              </h1>
              <p className="text-gray-500 mb-8 text-lg">
                Digite o CNPJ abaixo para visualizar o cartão CNPJ e situação cadastral.
              </p>

              <form onSubmit={handleSearch} className="max-w-xl mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-grow">
                     <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                     </div>
                     <input
                      type="text"
                      value={inputCnpj}
                      onChange={handleInputChange}
                      placeholder="00.000.000/0000-00"
                      maxLength={18}
                      className="w-full h-14 pl-12 pr-4 text-lg border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E80070] focus:border-transparent transition-all shadow-sm text-gray-700 bg-gray-50 focus:bg-white"
                     />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="h-14 px-8 bg-[#E80070] hover:bg-[#C2005D] text-white font-bold text-lg rounded-lg transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {loading ? '...' : 'Consultar'}
                  </button>
                </div>
              </form>

              {/* Error Message */}
              {error && (
                <div className="mt-6 bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium border border-red-100 inline-block">
                  {error}
                </div>
              )}

              {/* Tags */}
              <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
                   <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span> Dados da Receita Federal
                </div>
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
                   <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Atualizado Hoje
                </div>
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
                   <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span> Consulta Gratuita
                </div>
              </div>
            </div>

            {/* Info Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mt-8">
              <div className="bg-white p-6 rounded-[16px] shadow-sm border border-gray-100">
                 <h3 className="text-[#E80070] font-bold text-lg mb-2">O que é o CNPJ?</h3>
                 <p className="text-gray-600 text-sm leading-relaxed">
                   O Cadastro Nacional da Pessoa Jurídica é um número único que identifica uma pessoa jurídica e outros tipos de arranjo jurídico sem personalidade jurídica junto à Receita Federal.
                 </p>
              </div>
              <div className="bg-white p-6 rounded-[16px] shadow-sm border border-gray-100">
                 <h3 className="text-[#E80070] font-bold text-lg mb-2">Dados Públicos</h3>
                 <p className="text-gray-600 text-sm leading-relaxed">
                   Esta ferramenta consulta bases de dados públicas para retornar a situação cadastral, razão social, nome fantasia e endereço de empresas em todo o Brasil.
                 </p>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default App;
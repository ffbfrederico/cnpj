import React from 'react';
import { CnpjData } from '../types';
import { Building2, MapPin, Phone, DollarSign, Users, Printer } from 'lucide-react';
import { InfoCard } from './InfoCard';

interface ResultDisplayProps {
  data: CnpjData;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ data }) => {
  const isAtiva = data.situacao === 'ATIVA';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-6xl mx-auto animate-fade-in pb-12">
      {/* Header Result */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="border-l-4 border-[#d81b60] pl-4">
          <h2 className="text-2xl font-bold text-gray-800">Resultado da Consulta</h2>
        </div>
        <button 
          onClick={handlePrint}
          className="text-gray-500 hover:text-[#d81b60] text-sm underline flex items-center gap-1 transition-colors"
        >
          <Printer className="w-4 h-4" /> Imprimir Dados
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Dados Gerais (Spans 2 columns) */}
        <div className="lg:col-span-2 space-y-6">
          <InfoCard 
            icon={Building2} 
            title="Dados Gerais" 
            iconColor="text-pink-600"
            iconBg="bg-pink-100"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Razão Social</label>
                <div className="text-gray-900 font-medium text-base">{data.nome}</div>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nome Fantasia</label>
                <div className="text-gray-900 font-medium">{data.fantasia || '**************'}</div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">CNPJ</label>
                <div className="text-gray-900 font-medium">{data.cnpj}</div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Tipo</label>
                <div className="text-gray-900 font-medium">{data.tipo}</div>
              </div>

              <div className="md:col-span-2">
                 <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Natureza Jurídica</label>
                 <div className="text-gray-900 font-medium">{data.natureza_juridica}</div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Situação Cadastral</label>
                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${isAtiva ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {isAtiva ? '✓ ' : ''}{data.situacao}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Data da Situação</label>
                <div className="text-gray-900 font-medium">{data.data_situacao}</div>
              </div>
              
              {data.motivo_situacao && (
                <div className="md:col-span-2">
                   <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Motivo da Situação</label>
                   <div className="text-gray-900 font-medium">{data.motivo_situacao}</div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Abertura</label>
                <div className="text-gray-900 font-medium">{data.abertura}</div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Capital Social</label>
                <div className="text-gray-900 font-medium">R$ {data.capital_social}</div>
              </div>
            </div>
          </InfoCard>

          {/* Atividade Econômica */}
          <InfoCard 
            icon={DollarSign} 
            title="Atividade Econômica"
            iconColor="text-green-600"
            iconBg="bg-green-100"
          >
            <div className="space-y-4">
              <div>
                 <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded">Principal</span>
                 </div>
                 {data.atividade_principal.map((activity, index) => (
                    <div key={index} className="flex items-start gap-2 bg-gray-50 p-3 rounded border border-gray-100">
                      <span className="font-mono text-xs font-bold text-green-700 bg-green-50 px-2 py-1 rounded border border-green-100">{activity.code}</span>
                      <span className="text-gray-800 text-sm font-medium">{activity.text}</span>
                    </div>
                 ))}
              </div>
              
              {data.atividades_secundarias && data.atividades_secundarias.length > 0 && (
                 <div>
                    <div className="flex items-center gap-2 mb-2 mt-4">
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded">Secundárias</span>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                        {data.atividades_secundarias.map((activity, index) => (
                            <div key={index} className="flex items-start gap-2 p-2 border-b border-gray-50 last:border-0">
                                <span className="font-mono text-xs text-gray-500 min-w-[60px]">{activity.code}</span>
                                <span className="text-gray-700 text-sm">{activity.text}</span>
                            </div>
                        ))}
                    </div>
                 </div>
              )}
            </div>
          </InfoCard>
          
           {/* Quadro Societário */}
          {data.qsa && data.qsa.length > 0 && (
             <InfoCard 
               icon={Users} 
               title="Quadro Societário"
               iconColor="text-orange-600"
               iconBg="bg-orange-100"
             >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.qsa.map((socio, idx) => (
                        <div key={idx} className="bg-white border border-gray-200 p-4 rounded-lg flex flex-col shadow-sm">
                            <span className="font-bold text-gray-800 text-sm mb-1">{socio.nome}</span>
                            <span className="text-xs text-gray-500 uppercase">{socio.qual}</span>
                        </div>
                    ))}
                </div>
             </InfoCard>
          )}
        </div>

        {/* Right Column - Localização & Contato */}
        <div className="space-y-6">
          <InfoCard 
             icon={MapPin} 
             title="Localização"
             iconColor="text-blue-600"
             iconBg="bg-blue-100"
           >
             <div className="space-y-4">
                <div>
                   <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Logradouro</label>
                   <div className="text-gray-800">{data.logradouro}, {data.numero}</div>
                   {data.complemento && <div className="text-gray-600 text-sm">{data.complemento}</div>}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Bairro</label>
                        <div className="text-gray-800">{data.bairro}</div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">CEP</label>
                        <div className="text-gray-800">{data.cep}</div>
                    </div>
                </div>

                <div>
                   <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Município / UF</label>
                   <div className="text-gray-800 font-medium">{data.municipio} - {data.uf}</div>
                </div>
             </div>
           </InfoCard>

           <InfoCard 
             icon={Phone} 
             title="Contato"
             iconColor="text-purple-600"
             iconBg="bg-purple-100"
           >
             <div className="space-y-4">
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">E-mail</label>
                    <div className="text-gray-800 break-all">{data.email || 'Não informado'}</div>
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Telefone</label>
                    <div className="text-gray-800">{data.telefone || 'Não informado'}</div>
                </div>
             </div>
           </InfoCard>
        </div>
      </div>
    </div>
  );
};
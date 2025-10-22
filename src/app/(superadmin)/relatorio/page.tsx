'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from '../../../lib/axios';

const RelatorioPage = () => {
  const [relatorio, setRelatorio] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    axios.get('/superadmin/relatorio')
      .then(res => setRelatorio(res.data))
      .catch((e) => {
        console.error('Erro ao carregar relatório:', e);
        //router.push('/auth/login'); // Comentado para desenvolvimento
      });
  }, [router]);

  if (!relatorio) return <div>Carregando...</div>;
  return (
  <div>
      <h1 className="text-2xl mb-4">Relatório Global</h1>
      <p>Total de Tenants: {relatorio.totalTenants}</p>
      <p>Tenants Ativos: {relatorio.statusCounts?.ativo || 0}</p>
      <p>Receita Total: R$ {relatorio.totalReceita?.toFixed(2) || '0.00'}</p>
    </div>
  );
}

export default RelatorioPage
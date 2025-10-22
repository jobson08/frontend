'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from '../../../lib/axios';
import { Mensalidade } from '../../../lib/types';

const DashboardPage = () => {
  const [mensalidades, setMensalidades] = useState<Mensalidade[]>([]);
  const router = useRouter();

  useEffect(() => {
    axios.get('/mensalidades')
      .then(res => setMensalidades(res.data))
      .catch((e) => {
        console.error('Erro ao carregar mensalidades:', e);
        //router.push('/auth/login'); // Comentado para desenvolvimento
      });
  }, [router]);
  return (
 <div>
      <h1 className="text-2xl mb-4">Minhas Mensalidades</h1>
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">Valor</th>
            <th className="border p-2">Vencimento</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {mensalidades.map(m => (
            <tr key={m.id}>
              <td className="border p-2">R$ {m.valor.toFixed(2)}</td>
              <td className="border p-2">{new Date(m.vencimento).toLocaleDateString()}</td>
              <td className="border p-2">{m.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DashboardPage
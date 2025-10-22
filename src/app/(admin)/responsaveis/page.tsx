'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from '../../../lib/axios';
import { Responsavel } from '../../../lib/types';


const ResponsaveisPage = () => {
  const [responsaveis, setResponsaveis] = useState<Responsavel[]>([]);
  const router = useRouter();

  useEffect(() => {
    axios.get('/responsaveis')
      .then(res => setResponsaveis(res.data))
      .catch((e) => {
        console.error('Erro ao carregar responsáveis:', e);
       // router.push('/auth/login'); // Comentado para desenvolvimento
      });
  }, [router]);

  const handleCreate = async () => {
    const nome = prompt('Nome:');
    const email = prompt('Email:');
    const cpf = prompt('CPF:');
    const telefone = prompt('Telefone:');
    try {
      const res = await axios.post('/responsaveis', { nome, email, cpf, telefone });
      setResponsaveis([...responsaveis, res.data]);
    } catch (e: any) {
      alert(e.response?.data?.error || 'Erro ao criar');
    }
  };
  return (
   <div>
      <h1 className="text-2xl mb-4">Gerenciamento de Responsáveis</h1>
      <button onClick={handleCreate} className="bg-green-500 text-white p-2 mb-4">Adicionar Responsável</button>
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">Nome</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">CPF</th>
            <th className="border p-2">Telefone</th>
          </tr>
        </thead>
        <tbody>
          {responsaveis.map(resp => (
            <tr key={resp.id}>
              <td className="border p-2">{resp.nome}</td>
              <td className="border p-2">{resp.email || '-'}</td>
              <td className="border p-2">{resp.cpf || '-'}</td>
              <td className="border p-2">{resp.telefone || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResponsaveisPage
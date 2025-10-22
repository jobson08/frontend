'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from '../../../lib/axios';
import { Aluno, Responsavel } from '../../../lib/types';

const AlunosPage = () => {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [responsaveis, setResponsaveis] = useState<Responsavel[]>([]);
  const router = useRouter();

  useEffect(() => {
    Promise.all([axios.get('/alunos'), axios.get('/responsaveis')])
      .then(([alunosRes, responsaveisRes]) => {
        setAlunos(alunosRes.data);
        setResponsaveis(responsaveisRes.data);
      })
      .catch((e) => {
        console.error('Erro ao carregar dados:', e);
         // router.push('/auth/login'); // Comentado para desenvolvimento
      });
  }, [router]);

  const handleCreate = async () => {
    const name = prompt('Nome:');
    const birthDate = prompt('Data de Nascimento (YYYY-MM-DD):');
    const responsavelId = prompt('ID do Responsável (obrigatório para menores):');
    try {
      const res = await axios.post('/alunos', { name, birthDate, responsavelId });
      setAlunos([...alunos, res.data]);
    } catch (e: any) {
      alert(e.response?.data?.error || 'Erro ao criar');
    }
  };
  return (
  <div>
      <h1 className="text-2xl mb-4">Gerenciamento de Alunos</h1>
      <button onClick={handleCreate} className="bg-green-500 text-white p-2 mb-4">Adicionar Aluno</button>
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">Nome</th>
            <th className="border p-2">Data de Nascimento</th>
            <th className="border p-2">Responsável</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map(aluno => (
            <tr key={aluno.id}>
              <td className="border p-2">{aluno.name}</td>
              <td className="border p-2">{aluno.birthDate ? new Date(aluno.birthDate).toLocaleDateString() : '-'}</td>
              <td className="border p-2">{aluno.responsavel?.nome || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AlunosPage
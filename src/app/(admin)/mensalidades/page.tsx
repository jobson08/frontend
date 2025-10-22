'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from '../../../lib/axios';
import { Aluno, User, Mensalidade } from '../../../lib/types';

const MensalidadesPage = () => {
  const [mensalidades, setMensalidades] = useState<Mensalidade[]>([]);
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [funcionarios, setFuncionarios] = useState<User[]>([]);
  const router = useRouter();

  useEffect(() => {
    Promise.all([axios.get('/mensalidades'), axios.get('/alunos'), axios.get('/funcionarios')])
      .then(([mensalidadesRes, alunosRes, funcionariosRes]) => {
        setMensalidades(mensalidadesRes.data);
        setAlunos(alunosRes.data);
        setFuncionarios(funcionariosRes.data);
      })
      .catch((e) => {
        console.error('Erro ao carregar mensalidades:', e);
        //router.push('/auth/login'); // Comentado para desenvolvimento
      });
  }, [router]);

 /* const handleCreate = async () => {
    const tipo = prompt('Tipo (aluno ou funcionario):');
    const id = prompt(`ID do ${tipo === 'aluno' ? 'Aluno' : 'Funcionário'}:`);
    const valor = parseFloat(prompt('Valor:'));
    const vencimento = prompt('Vencimento (YYYY-MM-DD):');
    try {
     // const payload = { valor, vencimento, tipo };
      if (tipo === 'aluno') payload.alunoId = id;
      else payload.userId = id;
      await axios.post('/mensalidades', payload);
      const res = await axios.get('/mensalidades');
      setMensalidades(res.data);
    } catch (e: any) {
      alert(e.response?.data?.error || 'Erro ao criar');
    }
  };*/

  const handleGenerateBoleto = async (id: string) => {
    try {
      const res = await axios.post(`/mensalidades/${id}/boleto`, {});
      window.open(res.data.boletoUrl, '_blank');
    } catch (e: any) {
      alert(e.response?.data?.error || 'Erro ao gerar boleto');
    }
  };
  return (
    <div>
      <h1 className="text-2xl mb-4">Gerenciamento de Mensalidades</h1>
      {/*<button onClick={handleCreate} className="bg-green-500 text-white p-2 mb-4">Adicionar Mensalidade</button>*/}
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">Associado</th>
            <th className="border p-2">Responsável (se menor)</th>
            <th className="border p-2">Valor</th>
            <th className="border p-2">Vencimento</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {mensalidades.map(m => (
            <tr key={m.id}>
              <td className="border p-2">{m.aluno?.name || m.user?.name}</td>
              <td className="border p-2">{m.aluno?.responsavel?.nome || '-'}</td>
              <td className="border p-2">R$ {m.valor.toFixed(2)}</td>
              <td className="border p-2">{new Date(m.vencimento).toLocaleDateString()}</td>
              <td className="border p-2">{m.status}</td>
              <td className="border p-2">
                <button onClick={() => handleGenerateBoleto(m.id)} className="bg-blue-500 text-white p-1">Gerar Boleto</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MensalidadesPage
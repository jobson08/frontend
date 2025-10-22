'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from '../../../lib/axios';
import { Mensalidade, Aluno, DesenvolvimentoMensal, DesempenhoAtividade  } from '../../../lib/types';

const DashboardPage = () => {
   const [aluno, setAluno] = useState<Aluno | null>(null);
  //const [mensalidades, setMensalidades] = useState<Mensalidade[]>([]);
  const router = useRouter();

  useEffect(() => {
    axios.get('/alunos/me')
      .then(res => setAluno(res.data))
      .catch((e) => {
        console.error('Erro ao carregar mensalidades:', e);
        //router.push('/auth/login'); // Comentado para desenvolvimento
      });
  }, [router]);

  if (!aluno) return <div>Carregando...</div>;

  return (
 <div>
      <h1 className="text-2xl mb-4">Meu Perfil</h1>
      <div className="mb-4">
        <p><strong>Nome:</strong> {aluno.name}</p>
        <p><strong>Peso:</strong> {aluno.peso ? `${aluno.peso.toFixed(2)} kg` : '-'}</p>
        <p><strong>Altura:</strong> {aluno.altura ? `${aluno.altura.toFixed(2)} m` : '-'}</p>
        <p><strong>Atividade:</strong> {aluno.categoria?.atividade.nome || '-'}</p>
        <p><strong>Categoria de Idade:</strong> {aluno.categoria?.nome || '-'}</p>
      </div>
      <h2 className="text-xl mb-4">Desenvolvimento Mensal</h2>
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">Mês/Ano</th>
            <th className="border p-2">Comentário</th>
          </tr>
        </thead>
        <tbody>
          {aluno.desenvolvimentos?.map(d => (
            <tr key={d.id}>
              <td className="border p-2">{`${d.mes}/${d.ano}`}</td>
              <td className="border p-2">{d.comentario || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {aluno.categoria && (
        <>
          <h2 className="text-xl mt-4 mb-4">Desempenho em {aluno.categoria.atividade.nome}</h2>
          <table className="w-full border-collapse border">
            <thead>
              <tr>
                <th className="border p-2">Data</th>
                <th className="border p-2">Métricas</th>
                <th className="border p-2">Comentário</th>
              </tr>
            </thead>
            <tbody>
              {aluno.desempenhos?.filter(d => d.atividade === aluno.categoria?.atividade.nome.toLowerCase()).map(d => (
                <tr key={d.id}>
                  <td className="border p-2">{new Date(d.data).toLocaleDateString()}</td>
                  <td className="border p-2">
                    {d.atividade === 'futebol' && d.metrica.gols !== undefined ? `Gols: ${d.metrica.gols}` : ''}
                    {d.atividade === 'crossfit' && d.metrica.wod ? `WOD: ${d.metrica.wod}, Tempo: ${d.metrica.tempo}` : ''}
                  </td>
                  <td className="border p-2">{d.comentario || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default DashboardPage
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from '../../../lib/axios';
import { Aluno, Responsavel, Atividade, CategoriaIdade, DesenvolvimentoMensal, DesempenhoAtividade } from '../../../lib/types';

const AlunosPage = () => {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [responsaveis, setResponsaveis] = useState<Responsavel[]>([]);
  const [atividades, setAtividades] = useState<Atividade[]>([]);
  const [categoriasIdade, setCategoriasIdade] = useState<CategoriaIdade[]>([]);
  const router = useRouter();

  useEffect(() => {
 Promise.all([
      axios.get('/alunos?tenantId=temp-tenant-id'),
      axios.get('/responsaveis?tenantId=temp-tenant-id'),
      axios.get('/atividades?tenantId=temp-tenant-id'),
      axios.get('/categorias-idade?tenantId=temp-tenant-id'),
    ])
      .then(([alunosRes, responsaveisRes, atividadesRes, categoriasRes]) => {
        setAlunos(alunosRes.data);
        setResponsaveis(responsaveisRes.data);
        setAtividades(atividadesRes.data);
        setCategoriasIdade(categoriasRes.data);
      })
      .catch((e) => {
        console.error('Erro ao carregar dados:', e);
         // router.push('/auth/login'); // Comentado para desenvolvimento
      });
  }, [router]);

  const handleCreate = async () => {
    const name = prompt('Nome:');
    const birthDate = prompt('Data de Nascimento (YYYY-MM-DD):');
    const peso = prompt('Peso (kg):');
    const altura = prompt('Altura (m):');
    const responsavelId = prompt('ID do Responsável (obrigatório para menores):');
    const atividadeId = prompt(`ID da Atividade (${atividades.map(a => a.nome).join(', ')}):`);
    try {
      const res = await axios.post('/alunos', {
        name,
        birthDate,
        peso: peso ? parseFloat(peso) : null,
        altura: altura ? parseFloat(altura) : null,
        responsavelId: responsavelId || null,
        tenantId: 'temp-tenant-id',
        atividadeId,
      });
      setAlunos([...alunos, res.data]);
    } catch (e: any) {
      alert(e.response?.data?.error || 'Erro ao criar');
    }
  };

  const handleAddDesenvolvimento = async (alunoId: string) => {
    const mes = prompt('Mês (1-12):');
    const ano = prompt('Ano (ex: 2025):');
    const comentario = prompt('Comentário sobre o desenvolvimento:');
    try {
      await axios.post('/desenvolvimento', { alunoId, mes, ano, comentario });
      const res = await axios.get('/alunos?tenantId=temp-tenant-id');
      setAlunos(res.data);
    } catch (e: any) {
      alert(e.response?.data?.error || 'Erro ao adicionar desenvolvimento');
    }
  };

  const handleAddDesempenho = async (alunoId: string, atividade: string, atividadeId?: string) => {
    const data = prompt('Data do evento (YYYY-MM-DD):');
    if (!data) {
      alert('Data é obrigatória');
      return;
    }
    let metrica = {};
    if (atividade === 'Futebol') {
      const gols = prompt('Gols marcados:');
      if (gols === null) {
        alert('Gols cancelado');
        return;
      }
      const parsedGols = parseInt(gols);
      if (isNaN(parsedGols)) {
        alert('Gols deve ser um número válido');
        return;
      }
      metrica = { gols: parsedGols };
    } else if (atividade === 'CrossFit') {
      const wod = prompt('WOD (ex: Fran):');
      const tempo = prompt('Tempo (ex: 5:30):');
      if (!wod || !tempo) {
        alert('WOD e tempo são obrigatórios');
        return;
      }
      metrica = { wod, tempo };
    }
    const comentario = prompt('Comentário:');
    try {
      await axios.post('/desempenho', {
        alunoId,
        atividade: atividade.toLowerCase(),
        data,
        metrica,
        comentario,
        atividadeId, // Enviar atividadeId para associar ao desempenho
      });
      const res = await axios.get('/alunos?tenantId=temp-tenant-id');
      setAlunos(res.data);
    } catch (e: any) {
      alert(e.response?.data?.error || 'Erro ao adicionar desempenho');
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
            <th className="border p-2">Peso (kg)</th>
            <th className="border p-2">Altura (m)</th>
            <th className="border p-2">Atividade</th>
            <th className="border p-2">Categoria de Idade</th>
            <th className="border p-2">Responsável</th>
            <th className="border p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map(aluno => {
            const atividade = aluno.categoria?.atividade;
            return (
              <tr key={aluno.id}>
                <td className="border p-2">{aluno.name}</td>
                <td className="border p-2">{aluno.birthDate ? new Date(aluno.birthDate).toLocaleDateString() : '-'}</td>
                <td className="border p-2">{aluno.peso ? aluno.peso.toFixed(2) : '-'}</td>
                <td className="border p-2">{aluno.altura ? aluno.altura.toFixed(2) : '-'}</td>
                <td className="border p-2">{atividade?.nome || '-'}</td>
                <td className="border p-2">{aluno.categoria?.nome || '-'}</td>
                <td className="border p-2">{aluno.responsavel?.nome || '-'}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleAddDesenvolvimento(aluno.id)}
                    className="bg-blue-500 text-white p-1 mr-2"
                  >
                    Add Desenvolvimento
                  </button>
                  {atividade && (
                    <button
                      onClick={() => handleAddDesempenho(aluno.id, atividade.nome, atividade.id)}
                      className="bg-purple-500 text-white p-1"
                    >
                      Add Desempenho
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {alunos.map(aluno => {
        const atividade = aluno.categoria?.atividade;
        return (
          <div key={aluno.id} className="mt-4">
            <h2 className="text-xl">Desenvolvimento de {aluno.name}</h2>
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
            {atividade && (
              <>
                <h2 className="text-xl mt-4">Desempenho em {atividade.nome} de {aluno.name}</h2>
                <table className="w-full border-collapse border">
                  <thead>
                    <tr>
                      <th className="border p-2">Data</th>
                      <th className="border p-2">Métricas</th>
                      <th className="border p-2">Comentário</th>
                    </tr>
                  </thead>
                  <tbody>
                    {aluno.desempenhos?.filter(d => d.atividade === atividade.nome.toLowerCase()).map(d => (
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
      })}
    </div>
  );
}

export default AlunosPage
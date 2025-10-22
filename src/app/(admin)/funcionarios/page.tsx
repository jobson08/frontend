'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from '../../../lib/axios';
import { User } from '../../../lib/types';

const FuncionariosPage = () => {
  const [funcionarios, setFuncionarios] = useState<User[]>([]);
  const router = useRouter();

  useEffect(() => {
    axios.get('/funcionarios')
      .then(res => setFuncionarios(res.data))
      .catch((e) => {
        console.error('Erro ao carregar funcionários:', e);
        //router.push('/auth/login'); // Comentado para desenvolvimento
      });
  }, [router]);

  const handleCreate = async () => {
    const name = prompt('Nome:');
    const email = prompt('Email:');
    const password = prompt('Senha:');
    const role = prompt('Role (PROFESSOR, RH, SEGURANCA, OUTRO):');
    const departamento = prompt('Departamento:');
    try {
      const res = await axios.post('/funcionarios', { name, email, password, role, departamento });
      setFuncionarios([...funcionarios, res.data]);
    } catch (e: any) {
      alert(e.response?.data?.error || 'Erro ao criar');
    }
  };
  return (
   <div>
      <h1 className="text-2xl mb-4">Gerenciamento de Funcionários</h1>
      <button onClick={handleCreate} className="bg-green-500 text-white p-2 mb-4">Adicionar Funcionário</button>
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">Nome</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Departamento</th>
          </tr>
        </thead>
        <tbody>
          {funcionarios.map(func => (
            <tr key={func.id}>
              <td className="border p-2">{func.name}</td>
              <td className="border p-2">{func.email}</td>
              <td className="border p-2">{func.role}</td>
              <td className="border p-2">{func.departamento || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FuncionariosPage
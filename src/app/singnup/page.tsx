'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from '../../lib/axios';

export default function Signup() {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [plan, setPlan] = useState('basico');
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [atividadesDisponiveis, setAtividadesDisponiveis] = useState<string[]>([]);
  const [atividadesSelecionadas, setAtividadesSelecionadas] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    axios
      .get('/atividades/disponiveis')
      .then(res => setAtividadesDisponiveis(res.data))
      .catch(e => console.error('Erro ao carregar atividades:', e));
  }, []);

  const handleAtividadeToggle = (atividade: string) => {
    setAtividadesSelecionadas(prev =>
      prev.includes(atividade)
        ? prev.filter(a => a !== atividade)
        : [...prev, atividade]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/tenants', {
        name,
        slug,
        cpfCnpj,
        plan,
        siteData: { title: name, description: `Bem-vindo à ${name}`, logoUrl: '', primaryColor: '#3b82f6' },
        atividades: atividadesSelecionadas,
        adminName,
        adminEmail,
      });
      alert('Tenant criado com sucesso! Admin criado: ' + adminEmail);
      router.push(`/${slug}`);
    } catch (e: any) {
      alert(e.response?.data?.error || 'Erro ao criar tenant');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Criar Conta no EduPay</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Nome da Escolinha/Academia</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full p-2 border"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Slug (ex: escolinhax)</label>
          <input
            type="text"
            value={slug}
            onChange={e => setSlug(e.target.value)}
            className="w-full p-2 border"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">CPF ou CNPJ</label>
          <input
            type="text"
            value={cpfCnpj}
            onChange={e => setCpfCnpj(e.target.value)}
            className="w-full p-2 border"
            placeholder="Digite CPF (11 dígitos) ou CNPJ (14 dígitos)"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Nome do Administrador</label>
          <input
            type="text"
            value={adminName}
            onChange={e => setAdminName(e.target.value)}
            className="w-full p-2 border"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Email do Administrador</label>
          <input
            type="email"
            value={adminEmail}
            onChange={e => setAdminEmail(e.target.value)}
            className="w-full p-2 border"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Plano</label>
          <select value={plan} onChange={e => setPlan(e.target.value)} className="w-full p-2 border">
            <option value="basico">Básico</option>
            <option value="pro">Pro</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Atividades Oferecidas</label>
          {atividadesDisponiveis.map(atividade => (
            <div key={atividade} className="flex items-center">
              <input
                type="checkbox"
                checked={atividadesSelecionadas.includes(atividade)}
                onChange={() => handleAtividadeToggle(atividade)}
                className="mr-2"
              />
              <span>{atividade}</span>
            </div>
          ))}
        </div>
        <button type="submit" className="bg-green-500 text-white p-2 w-full">Criar Conta</button>
      </form>
    </div>
  );
}
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from '../../../lib/axios';
import { Tenant } from '../../../lib/types';

const tenantsPage = () => {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const router = useRouter();

  useEffect(() => {
    axios.get('/superadmin/tenants')
      .then(res => setTenants(res.data))
      .catch((e) => {
        console.error('Erro ao carregar tenants:', e);
       // router.push('/auth/login'); // Comentado para desenvolvimento
      });
  }, [router]);

  const handleEdit = async (id: string, newPlan: string, newStatus: string) => {
    try {
      const res = await axios.put(`/superadmin/tenants/${id}`, { plan: newPlan, status: newStatus });
      setTenants(tenants.map(t => t.id === id ? res.data : t));
    } catch (e: any) {
      alert(e.response?.data?.error || 'Erro ao editar');
    }
  };
  return (
   <div>
      <h1 className="text-2xl mb-4">Controle de Tenants</h1>
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">Nome</th>
            <th className="border p-2">Slug</th>
            <th className="border p-2">Plan</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {tenants.map(tenant => (
            <tr key={tenant.id}>
              <td className="border p-2">{tenant.name}</td>
              <td className="border p-2">{tenant.slug}</td>
              <td className="border p-2">{tenant.plan}</td>
              <td className="border p-2">{tenant.status}</td>
              <td className="border p-2">
                <select
                  value={tenant.plan}
                  onChange={e => handleEdit(tenant.id, e.target.value, tenant.status)}
                  className="border p-1 mr-2"
                >
                  <option value="saas">saas</option>
                  <option value="saas+site">saas+site</option>
                </select>
                <select
                  value={tenant.status}
                  onChange={e => handleEdit(tenant.id, tenant.plan, e.target.value)}
                  className="border p-1"
                >
                  <option value="ativo">Ativo</option>
                  <option value="suspenso">Suspenso</option>
                  <option value="teste">Teste</option>
                  <option value="cancelado">Cancelado</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default tenantsPage
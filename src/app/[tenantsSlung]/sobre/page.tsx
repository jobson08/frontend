import axios from '../../../lib/axios';
import { Tenant } from '../../../lib/types';

export default async function Sobre({ params }: { params: { tenantSlug: string } }) {
  let tenant: Tenant | null = null;
  try {
    const res = await axios.get(`/tenants/${params.tenantSlug}`);
    tenant = res.data;
  } catch (e) {
    return <div>Erro: Tenant não encontrado</div>;
  }

  return (
    <div className="p-4">
      {/*<h1 className="text-2xl">Sobre Nós - {tenant.name}</h1>*/}
      <p>Descrição do tenant.</p>
    </div>
  );
}
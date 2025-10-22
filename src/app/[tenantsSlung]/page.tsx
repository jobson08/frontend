import axios from '../../lib/axios';
import { Tenant } from '../../lib/types';

export default async function Home({ params }: { params: { tenantSlug: string } }) {
  let tenant: Tenant | null = null;
  try {
    const res = await axios.get(`/tenants/${params.tenantSlug}`);
    tenant = res.data;
  } catch (e) {
    return <div>Erro: Tenant não encontrado</div>;
  }

  return (
    <div className="p-4">
       <p> tenant.</p>
    {/*} <h1 className="text-3xl">{tenant.siteData?.title || tenant.name}</h1>
      <p>{tenant.siteData?.description || 'Bem-vindo!'}</p>*/}
    </div>
  );
}
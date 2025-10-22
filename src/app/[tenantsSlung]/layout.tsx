import axios from '../../lib/axios';
import { Tenant } from '../../lib/types';
import Navbar from '../../components/Navbar';

export async function generateMetadata({ params }: { params: { tenantSlug: string } }) {
  try {
    const res = await axios.get(`/tenants/${params.tenantSlug}`);
    const tenant: Tenant = res.data;
    return {
      title: tenant.siteData?.title || tenant.name,
      description: tenant.siteData?.description || 'Bem-vindo ao site do tenant',
    };
  } catch (e) {
    return { title: 'EduPay', description: 'Site não encontrado' };
  }
}

export default async function TenantLayout({ children, params }: { children: React.ReactNode; params: { tenantSlug: string } }) {
  let tenant: Tenant | null = null;
  try {
    const res = await axios.get(`/tenants/${params.tenantSlug}`);
    tenant = res.data;
  } catch (e) {
    return <div>Erro: Tenant não encontrado</div>;
  }

  return (
    <div>
      <Navbar tenant={tenant} />
      <main>{children}</main>
      <footer className="p-4 bg-gray-800 text-white text-center">
        © {new Date().getFullYear()} {tenant?.name || 'EduPay'}
      </footer>
    </div>
  );
}
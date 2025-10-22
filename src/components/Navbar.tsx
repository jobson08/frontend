import Link from 'next/link';
import { Tenant } from '../lib/types';

export default function Navbar({ tenant }: { tenant: Tenant | null }) {
  return (
    //(para site público):
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-xl">{tenant?.siteData?.title || tenant?.name || 'EduPay'}</h1>
        <ul className="flex space-x-4">
          <li><Link href={`/${tenant?.slug || ''}`} className="hover:underline">Home</Link></li>
          <li><Link href={`/${tenant?.slug || ''}/sobre`} className="hover:underline">Sobre</Link></li>
        </ul>
      </div>
    </nav>
  );
}
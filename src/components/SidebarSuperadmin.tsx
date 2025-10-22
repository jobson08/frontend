import Link from "next/link"


const SidebarSuperadmin = () => {
  return (
 <aside className="w-64 bg-gray-800 text-white p-4 h-screen fixed">
      <h2 className="text-xl mb-4">Painel Admin</h2>
      <nav>
        <ul>
          <li><Link href="/superadmin/tenants" className="block p-2 hover:bg-gray-700">Tenants</Link></li>
          <li><Link href="/superadmin/relatorio" className="block p-2 hover:bg-gray-700">Relatório</Link></li>
        </ul>
      </nav>
    </aside>
  )
}

export default SidebarSuperadmin
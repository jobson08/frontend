import Link from "next/link"


const Sidebar = () => {
  return (
 <aside className="w-64 bg-gray-800 text-white p-4 h-screen fixed">
      <h2 className="text-xl mb-4">Painel Admin</h2>
      <nav>
        <ul>
          <li><Link href="/admin/alunos" className="block p-2 hover:bg-gray-700">Alunos</Link></li>
          <li><Link href="/admin/responsaveis" className="block p-2 hover:bg-gray-700">Responsáveis</Link></li>
          <li><Link href="/admin/funcionarios" className="block p-2 hover:bg-gray-700">Funcionários</Link></li>
          <li><Link href="/admin/mensalidades" className="block p-2 hover:bg-gray-700">Mensalidades</Link></li>
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
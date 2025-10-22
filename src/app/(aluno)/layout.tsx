//import ProtectedRoute from '../../components/ProtectedRoute';

export default function AlunoLayout({ children }: { children: React.ReactNode }) {
  return (
    //<ProtectedRoute allowedRoles={['ALUNO']}>
      <div className="p-4">
        <header className="mb-4">
          <h1 className="text-2xl">Área do Aluno</h1>
        </header>
        <main>{children}</main>
      </div>
   // </ProtectedRoute>
  );
}
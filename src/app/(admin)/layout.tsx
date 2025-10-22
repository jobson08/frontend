import Sidebar from '../../components/Sidebar';
//import ProtectedRoute from '../../components/ProtectedRoute';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
   // <ProtectedRoute allowedRoles={['ADMIN']}>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 ml-64">{children}</main>
      </div>
    //</ProtectedRoute>
  );
}
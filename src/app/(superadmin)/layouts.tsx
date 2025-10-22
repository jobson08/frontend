import SidebarSuperadmin from '../../components/SidebarSuperadmin';
//import ProtectedRoute from '../../components/ProtectedRoute';

export default function SuperadminLayout({ children }: { children: React.ReactNode }) {
  return (
   // <ProtectedRoute allowedRoles={['SUPERADMIN']}>
      <div className="flex">
        <SidebarSuperadmin />
        <main className="flex-1 p-4 ml-64">{children}</main>
      </div>
   // </ProtectedRoute>
  );
}
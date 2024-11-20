import { useAuth } from "../context/AuthContext"; 
import NavbarDashboard from "../components/dashboard/NavbarDashboard";
import SidebarDashboard from "../components/dashboard/SidebarDashboard";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { role, user } = useAuth();

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="sm:fixed w-full sm:w-64">
        <SidebarDashboard />
      </div>

      <main className="flex-1 md:ml-64 bg-gray-100 p-4">
        <NavbarDashboard user={user} role={role} />

        <div className="p-6 mt-6 bg-white shadow-md rounded-md">
          {children}
        </div>
      </main>
    </div>
  );
}

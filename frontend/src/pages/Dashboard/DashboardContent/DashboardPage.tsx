import TitleDashboardContent from "../../../components/dashboard/TitleDashboardContent";
import { useAuth } from "../../../context/AuthContext";
import DashboardLayout from "../../../layout/Dashboard";
import DashboardAdmin from "./component/DashboardAdmin";
import DashboardAuthor from "./component/DashboardAuthor";

export default function DashboardPage() {
  const { role } = useAuth();

  return (
    <DashboardLayout>
      <TitleDashboardContent>
        Dashboard
      </TitleDashboardContent>
      <div className="w-full flex items-center flex-wrap">
        {role === "admin" ? (
          <DashboardAdmin />
        ) : (
          <DashboardAuthor />
        )}
      </div>
    </DashboardLayout>
  );
}

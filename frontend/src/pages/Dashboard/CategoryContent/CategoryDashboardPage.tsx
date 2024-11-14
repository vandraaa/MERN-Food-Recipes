import TitleDashboardContent from "../../../components/dashboard/TitleDashboardContent";
import DashboardLayout from "../../../layout/Dashboard";
import Table from "../../../components/table/Table";
import ButtonAction from "../../../components/table/ButtonAction";

export default function CategoryDashboardPage() {
  const headers = ["No", "Name", "Action"];
  const rows = [
    { no: 1, name: "Sample Category 1" },
    { no: 2, name: "Sample Category 2" },
  ];

  const action = () => (
    <ButtonAction onEdit={() => {}} onDelete={() => {}} />
  );

  return (
    <DashboardLayout>
      <TitleDashboardContent>Category Recipe</TitleDashboardContent>
      <div className="flex items-center justify-end mx-2 sm:mx-6 mt-2">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          + Add Category
        </button>
      </div>

      <div className="overflow-x-auto mt-4 mx-2 sm:mx-6">
        <Table headers={headers} rows={rows} action={action} />
      </div>
    </DashboardLayout>
  );
}

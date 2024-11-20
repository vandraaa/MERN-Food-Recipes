import { useNavigate } from "react-router-dom";
import TitleDashboardContent from "../../../components/dashboard/TitleDashboardContent";
import AddButtonTable from "../../../components/table/AddButtonTable";
import SearchInputTable from "../../../components/table/SearchInputTable";
import DashboardLayout from "../../../layout/Dashboard";
import Table from "../../../components/table/Table";
import ButtonActionTable from "../../../components/table/ButtonActionTable";
import { useEffect, useState } from "react";
import { getListDraftRecipe } from "./lib/data";
import ButtonUpdateStatus from "../../../components/table/ButtonUpdateStatus";
import { handleDeleteRecipe, handleUpdateStatusRecipe } from "./lib/action";
import StatusBadge from "../../../components/form/statusBadge";

interface ListRecipe {
  _id: string;
  title: string;
  image: {
    imageUrl: string;
  };
  status: string;
}

export default function DraftRecipeDashboardPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState<ListRecipe[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await getListDraftRecipe();
        setData(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredRows = data
    .filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .map((item, index) => ({
      id: item._id,
      no: index + 1,
      image: item.image.imageUrl,
      title: item.title,
      ingredients: (
        <button
          className="text-blue-500 underline hover:text-blue-700"
          onClick={() => navigate(`/dashboard/recipe/ingredients/${item._id}`)}
        >
          View Ingredients
        </button>
      ),
      steps: (
        <button
          className="text-blue-500 underline hover:text-blue-700"
          onClick={() => navigate(`/dashboard/recipe/steps/${item._id}`)}
        >
          View Steps
        </button>
      ),
      status: <StatusBadge status={item.status} />,
    }));

  const renderActions = (id: string) => {
    return (
      <ButtonActionTable
        onDetail={() => navigate(`/dashboard/detail-recipe/${id}`)}
        onEdit={() => navigate(`/dashboard/recipe/edit/${id}`)}
        onDelete={() => handleDeleteRecipe(id, setIsLoading, setData)}
      />
    );
  };

  const renderUpdateStatus = (id: string) => {
    return (
      <ButtonUpdateStatus
        onApply={() =>
          handleUpdateStatusRecipe(id, "pending", setIsLoading, setData)
        }
      />
    );
  };

  const headers = [
    "No",
    "Image",
    "Title",
    "Ingredients",
    "Steps",
    "Status",
    "Action",
    "Update Status",
  ];

  return (
    <DashboardLayout>
      <TitleDashboardContent>Draft Recipe</TitleDashboardContent>
      <div className="flex items-center justify-between mx-2 sm:mx-6 mt-2">
        <SearchInputTable
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search..."
        />
        <AddButtonTable
          onClick={() => navigate("/dashboard/create-recipe")}
          label="Add New Recipe"
        />
      </div>

      <Table
        rows={filteredRows}
        headers={headers}
        action={(row) => renderActions(row.id)}
        updateStatus={(row) => renderUpdateStatus(row.id)}
        loading={isLoading}
      />
    </DashboardLayout>
  );
}

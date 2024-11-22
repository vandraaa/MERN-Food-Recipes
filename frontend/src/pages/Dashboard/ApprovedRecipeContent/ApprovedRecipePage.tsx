import { useNavigate } from "react-router-dom";
import TitleDashboardContent from "../../../components/dashboard/TitleDashboardContent";
import { useAuth } from "../../../context/AuthContext";
import DashboardLayout from "../../../layout/Dashboard";
import { useEffect, useState } from "react";
import { getListApprovedRecipe } from "./lib/data";
import SearchInputTable from "../../../components/table/SearchInputTable";
import Table from "../../../components/table/Table";
import ButtonActionTable from "../../../components/table/ButtonActionTable";
import { handleDeleteRecipe } from "./lib/action";
import StatusBadge from "../../../components/form/statusBadge";

interface ListRecipe {
  _id: string;
  title: string;
  image: {
    imageUrl: string;
  };
  status: string;
}

export default function ApprovedRecipeDashboardPage() {
  const { role } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState<ListRecipe[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await getListApprovedRecipe();
        setData(res.data);
        console.log(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredRows =
    role === "author"
      ? data
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
                onClick={() =>
                  navigate(`/dashboard/recipe/ingredients/${item._id}`)
                }
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
          }))
      : data
          .filter((item) =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((item, index) => ({
            id: item._id,
            no: index + 1,
            image: item.image.imageUrl,
            title: item.title,
            status: <StatusBadge status={item.status} />,
          }));

  const renderActions = (id: string) => {
    if (role === "author") {
      return (
        <ButtonActionTable
          onDetail={() => navigate(`/dashboard/detail-recipe/${id}`)}
          onEdit={() => navigate(`/dashboard/recipe/edit/${id}`)}
          onDelete={() => handleDeleteRecipe(id, setIsLoading, setData)}
        />
      );
    } else {
      return (
        <ButtonActionTable
          onDetail={() => navigate(`/dashboard/detail-recipe/${id}`)}
          onDelete={() => handleDeleteRecipe(id, setIsLoading, setData)}
        />
      );
    }
  };

  const headers =
    role === "admin"
      ? ["No", "Image", "Title", "Status", "Action"]
      : ["No", "Image", "Title", "Ingredients", "Steps", "Status", "Action"];

  return (
    <DashboardLayout>
      <TitleDashboardContent>Approved Recipe</TitleDashboardContent>
      <div className="flex items-center justify-between mx-2 sm:mx-6 mt-2">
        <SearchInputTable
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search..."
        />
      </div>

      <Table
        headers={headers}
        rows={filteredRows}
        action={(row) => renderActions(row.id)}
        loading={isLoading}
      />
    </DashboardLayout>
  );
}

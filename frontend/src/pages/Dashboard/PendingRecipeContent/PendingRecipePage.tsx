import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getListPendingRecipe, updateStatusRecipe } from "./lib/data";
import ButtonActionTable from "../../../components/table/ButtonActionTable";
import DashboardLayout from "../../../layout/Dashboard";
import TitleDashboardContent from "../../../components/dashboard/TitleDashboardContent";
import SearchInputTable from "../../../components/table/SearchInputTable";
import Table from "../../../components/table/Table";
import ButtonUpdateStatus from "../../../components/table/ButtonUpdateStatus";
import { handleDeleteRecipe } from "../ApprovedRecipeContent/lib/action";
import Swal from "sweetalert2";

interface ListRecipe {
  _id: string;
  title: string;
  image: {
    imageUrl: string;
  };
  status: string;
}

export default function PendingRecipeDashboardPage() {
  const { role } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState<ListRecipe[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await getListPendingRecipe();
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
      status: item.status.toUpperCase(),
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

  const handleUpdateStatusRecipe = async (id: string, status: 'approved' | 'rejected' | 'pending') => {
        try {
            console.log(id, status)
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, update it!'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    setIsLoading(true);
                    const res = await updateStatusRecipe(id, status);
                    if (res.status === "success") {
                        const data = await getListPendingRecipe();
                        setData(data.data);
                        setIsLoading(false);
                        Swal.fire(
                            'Updated!',
                            res.message,
                            'success'
                        )
                    } else {
                        Swal.fire("Error!", res.error.message, "error");
                        setIsLoading(false);
                    }
                }
            })
        } catch (error) {
            console.error(error)
            setIsLoading(false);
            Swal.fire("Error!", "Failed to update status recipe.", "error");
        }
    }

  const renderUpdateStatus = (id: string) => {
    if (role === "admin") {
      return (
        <ButtonUpdateStatus
            onApproved={() => handleUpdateStatusRecipe(id, "approved")}
            onRejected={() => handleUpdateStatusRecipe(id, "rejected")}
        />
      );
    }
  }

  const headers =
    role === "admin"
      ? ["No", "Image", "Title", "Status", "Action", "Update Status"]
      : ["No", "Image", "Title", "Status", "Action"];

  return (
    <DashboardLayout>
      <TitleDashboardContent>Pending Recipe</TitleDashboardContent>
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
        updateStatus={(row) => renderUpdateStatus(row.id)}
        loading={isLoading}
      />
    </DashboardLayout>
  );
}

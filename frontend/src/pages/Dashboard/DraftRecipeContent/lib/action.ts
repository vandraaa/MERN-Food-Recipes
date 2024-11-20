import Swal from "sweetalert2";
import { SetState } from "../../CategoryContent/lib/action";
import { deleteRecipe } from "../../ApprovedRecipeContent/lib/data";
import { getListDraftRecipe } from "./data";
import { updateStatusRecipe } from "../../PendingRecipeContent/lib/data";

interface ListRecipe {
  _id: string;
  title: string;
  image: {
    imageUrl: string;
  };
  status: string;
}

export const handleDeleteRecipe = async (
  id: string,
  setIsLoading: SetState<boolean>,
  setData: SetState<ListRecipe[]>
) => {
  const confirmed = await Swal.fire({
    title: "Are you sure?",
    text: "This action cannot be undone!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  });

  if (confirmed.isConfirmed) {
    try {
      setIsLoading(true);
      const deleted = await deleteRecipe(id);
      const res = await getListDraftRecipe();
      setData(res.data);
      Swal.fire("Deleted!", deleted.message, "success");
    } catch (e) {
      console.error(e);
      Swal.fire("Error!", "Failed to delete recipe.", "error");
    } finally {
      setIsLoading(false);
    }
  }
};

export const handleUpdateStatusRecipe = async (
  id: string,
  status: "approved" | "rejected" | "pending",
  setIsLoading: SetState<boolean>,
  setData: SetState<ListRecipe[]>
) => {
    try {
        console.log(id, status);
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, update it!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            setIsLoading(true);
            const res = await updateStatusRecipe(id, status);
            if (res.status === "success") {
              const data = await getListDraftRecipe();
              setData(data.data);
              setIsLoading(false);
              Swal.fire("Updated!", res.message, "success");
            } else {
              Swal.fire("Error!", res.error.message, "error");
              setIsLoading(false);
            }
          }
        });
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        Swal.fire("Error!", "Failed to update status recipe.", "error");
      }
};
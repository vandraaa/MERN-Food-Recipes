import Swal from "sweetalert2";
import { deleteRecipe, getListApprovedRecipe } from "./data";
import { SetState } from "../../CategoryContent/lib/action";

interface ListRecipe {
    _id: string,
    title: string,
    image: {
        imageUrl: string
    },
    status: string,
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
        const res = await getListApprovedRecipe();
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
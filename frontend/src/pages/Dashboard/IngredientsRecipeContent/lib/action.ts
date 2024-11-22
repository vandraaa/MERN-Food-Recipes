import Swal from "sweetalert2";
import { createIngredients, deleteIngredients, getIngredients, updateIngredients } from "./data";

export const handleAddIngredients = async (
  recipeId: string,
  formData: { [key: string]: string },
  setData: React.Dispatch<
    React.SetStateAction<{ id: string; name: string; quantity: string }[]>
  >,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    setIsLoading(true);
    const newIngredients = await createIngredients(recipeId, formData.name, formData.quantity);
    const res = await getIngredients(recipeId);
    setData(res.data);
    Swal.fire("Added!", newIngredients.message, "success");
  } catch (e) {
    Swal.fire("Error!", "Failed to add ingredients.", "error");
    console.error(e);
  } finally {
    setIsLoading(false);
  }
};

export const handleEditIngredients = async (
  recipeId: string,
  id: string,
  formData: { [key: string]: string },
  setData: React.Dispatch<
    React.SetStateAction<{ id: string; name: string; quantity: string }[]>
  >,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    setIsLoading(true);
    const newIngredients = await updateIngredients(id, formData.name, formData.quantity);
    const res = await getIngredients(recipeId);
    setData(res.data);
    Swal.fire("Added!", newIngredients.message, "success");
  } catch (e) {
    Swal.fire("Error!", "Failed to update ingredients.", "error");
    console.error(e);
  } finally {
    setIsLoading(false);
  }
};

export const handleDeleteIngredients = async (
  recipeId: string,
  id: string,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setData: React.Dispatch<
  React.SetStateAction<{ id: string; name: string; quantity: string }[]>
>
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
      const deleted = await deleteIngredients(id);
      const res = await getIngredients(recipeId);
      setData(res.data);
      Swal.fire("Deleted!", deleted.message, "success");
    } catch (e) {
      console.error(e);
      Swal.fire("Error!", "Failed to delete ingredient.", "error");
    } finally {
      setIsLoading(false);
    }
  }
};
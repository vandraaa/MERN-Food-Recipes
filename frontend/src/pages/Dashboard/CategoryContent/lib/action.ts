import Swal from "sweetalert2";
import { createNewCategory, deleteCategory, getCategory, updateCategory } from "./data";

interface Category {
  id: string;
  name: string;
}

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export const handleAddCategory = async (
  formData: { [key: string]: string },
  setData: React.Dispatch<React.SetStateAction<{ id: string; name: string }[]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    setIsLoading(true);
    const newCategory = await createNewCategory(formData.name);
    const res = await getCategory();
    setData(res.data);
    Swal.fire("Added!", newCategory.message, "success");
  } catch (e) {
    Swal.fire("Error!", "Failed to add category.", "error");
    console.error(e);
  } finally {
    setIsLoading(false);
  }
};

export const handleEditCategory = async (
  id: string,
  formData: { [key: string]: string },
  setData: React.Dispatch<React.SetStateAction<{ id: string; name: string }[]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    setIsLoading(true);
    const newCategory = await updateCategory(id, formData.name);
    const res = await getCategory();
    setData(res.data);
    Swal.fire("Updated!", newCategory.message, "success");
  } catch (e) {
    Swal.fire("Error!", "Failed to update category.", "error");
    console.error(e);
  } finally {
    setIsLoading(false);
  }
}

export const handleDeleteCategory = async (
  id: string,
  setIsLoading: SetState<boolean>,
  setData: SetState<Category[]>
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
      const deleted = await deleteCategory(id);
      const res = await getCategory();
      setData(res.data);
      Swal.fire("Deleted!", deleted.message, "success");
    } catch (e) {
      console.error(e);
      Swal.fire("Error!", "Failed to delete category.", "error");
    } finally {
      setIsLoading(false);
    }
  }
};

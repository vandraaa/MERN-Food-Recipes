import Swal from "sweetalert2";
import { createSteps, deleteSteps, getAllSteps, updateSteps } from "./data";

export const handleAddSteps = async (
  recipeId: string,
  formData: { [key: string]: string },
  setData: React.Dispatch<
    React.SetStateAction<{ id: string; instruction: string; step_number: string }[]>
  >,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    setIsLoading(true);
    const newSteps = await createSteps(
      recipeId,
      formData.instruction,
    );
    const res = await getAllSteps(recipeId);
    setData(res.data);
    Swal.fire("Added!", newSteps.message, "success");
  } catch (e) {
    Swal.fire("Error!", "Failed to add steps", "error");
    console.error(e);
  } finally {
    setIsLoading(false);
  }
};

export const handleEditSteps = async (
    recipeId: string,
    id: string,
    formData: { [key: string]: string },
    setData: React.Dispatch<
      React.SetStateAction<{ id: string; instruction: string; step_number: string }[]>
    >,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      setIsLoading(true);
      const newSteps = await updateSteps(id, formData.instruction);
      const res = await getAllSteps(recipeId);
      setData(res.data);
      Swal.fire("Added!", newSteps.message, "success");
    } catch (e) {
      Swal.fire("Error!", "Failed to update step.", "error");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

export const handleDeleteSteps = async (
    recipeId: string,
    id: string,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setData: React.Dispatch<
    React.SetStateAction<{ id: string; instruction: string; step_number: string }[]>
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
        const deleted = await deleteSteps(id);
        const res = await getAllSteps(recipeId);
        setData(res.data);
        Swal.fire("Deleted!", deleted.message, "success");
      } catch (e) {
        console.error(e);
        Swal.fire("Error!", "Failed to delete a step", "error");
      } finally {
        setIsLoading(false);
      }
    }
  };
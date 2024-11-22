import { useEffect, useState } from "react";
import TitleDashboardContent from "../../../components/dashboard/TitleDashboardContent";
import DashboardLayout from "../../../layout/Dashboard";
import Table from "../../../components/table/Table";
import { getCategory } from "./lib/data";
import ButtonActionTable from "../../../components/table/ButtonActionTable";
import SearchInputTable from "../../../components/table/SearchInputTable";
import AddButtonTable from "../../../components/table/AddButtonTable";
import {
  handleAddCategory,
  handleDeleteCategory,
  handleEditCategory,
} from "./lib/action";
import PopupForm from "../../../components/form/popupForm";

export default function CategoryDashboardPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<{ id: string; name: string }[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const handleOpenPopup = (category?: { id: string; name: string }) => {
    if (category) {
      setCategoryToEdit(category);
    } else {
      setCategoryToEdit(null);
    }
    setIsPopupOpen(true);
  };
  const handleClosePopup = () => setIsPopupOpen(false);

  const handleAdd = async (formData: { [key: string]: string }) => {
    await handleAddCategory(formData, setData, setIsLoading);
    handleClosePopup();
  };

  const handleEdit = async (formData: { [key: string]: string }) => {
    if (categoryToEdit) {
      await handleEditCategory(
        categoryToEdit.id,
        formData,
        setData,
        setIsLoading
      );
      handleClosePopup();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await getCategory();
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
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .map((item, index) => ({
      id: item.id,
      no: index + 1,
      name: item.name,
    }));

  return (
    <DashboardLayout>
      <TitleDashboardContent>Category Recipe</TitleDashboardContent>
      <div className="flex items-center justify-between mx-2 sm:mx-6 mt-2">
        <SearchInputTable
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search..."
        />
        <AddButtonTable onClick={() => handleOpenPopup()} label="Add Category" />
      </div>

      <Table
        headers={["No", "Name", "Action"]}
        rows={filteredRows}
        action={(row) => (
          <ButtonActionTable
            onEdit={() => handleOpenPopup({ id: row.id, name: row.name })}
            onDelete={() => handleDeleteCategory(row.id, setIsLoading, setData)}
          />
        )}
        loading={isLoading}
      />

      <PopupForm
        title={categoryToEdit ? "Edit Category" : "Add New Category"}
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        onSubmit={categoryToEdit ? handleEdit : handleAdd}
        fields={[
          {
            labelText: "Category Name",
            inputType: "text",
            placeholder: "Enter category name",
            name: "name",
            defaultValue: categoryToEdit ? categoryToEdit.name : "",
          },
        ]}
      />
    </DashboardLayout>
  );
}

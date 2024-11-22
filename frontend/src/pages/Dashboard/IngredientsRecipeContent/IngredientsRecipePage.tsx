import { useEffect, useState } from "react";
import TitleDashboardContent from "../../../components/dashboard/TitleDashboardContent";
import AddButtonTable from "../../../components/table/AddButtonTable";
import SearchInputTable from "../../../components/table/SearchInputTable";
import DashboardLayout from "../../../layout/Dashboard";
import PopupForm from "../../../components/form/popupForm";
import { handleAddIngredients, handleDeleteIngredients, handleEditIngredients } from "./lib/action";
import { useParams } from "react-router-dom";
import { getIngredients } from "./lib/data";
import Table from "../../../components/table/Table";
import ButtonActionTable from "../../../components/table/ButtonActionTable";

interface IngredientsType {
    id: string;
    name: string;
    quantity: string;
}

export default function IngredientsRecipeDashboardPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<IngredientsType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [ingredientsToEdit, setIngredientsToEdit] = useState<IngredientsType | null>(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
        const fetchData = async () => {
          setIsLoading(true);
          try {
            const res = await getIngredients(id!);
            setData(res.data);
          } catch (e) {
            console.error(e);
          } finally {
            setIsLoading(false);
          }
        };

        fetchData();
    }
  }, []);

  const handleOpenPopup = (ingredients?: {id: string; name: string; quantity: string;}) => {
    if (ingredients) {
      setIngredientsToEdit(ingredients); 
    } else {
      setIngredientsToEdit(null); 
    }
    setIsPopupOpen(true);
  };
  const handleClosePopup = () => setIsPopupOpen(false);

  const handleAdd = async (formData: { [key: string]: string }) => {
    await handleAddIngredients(id!, formData, setData, setIsLoading);
    handleClosePopup();
  };

  const handleEdit = async (formData: { [key: string]: string }) => {
    if (ingredientsToEdit) {
      await handleEditIngredients(id!, ingredientsToEdit.id, formData, setData, setIsLoading);
      handleClosePopup();
    }
  };

  const filteredRows = data
    .filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .map((item, index) => ({
      id: item.id,
      no: index + 1,
      name: item.name,
      quantity: item.quantity
    }));

  return (
    <DashboardLayout>
      <TitleDashboardContent>Ingredients</TitleDashboardContent>

      <div className="flex items-center justify-between mx-2 sm:mx-6 mt-2">
        <SearchInputTable
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search..."
        />
        <AddButtonTable onClick={() => handleOpenPopup()} label="Add Ingredients" />
      </div>

      <Table
        headers={["No", "Name", "Quantity", "Action"]}
        rows={filteredRows}
        action={(row) => (
          <ButtonActionTable
            onEdit={() => handleOpenPopup({ id: row.id, name: row.name, quantity: row.quantity })}
            onDelete={() => handleDeleteIngredients(id!, row.id, setIsLoading, setData)}
          />
        )}
        loading={isLoading}
      />

      <PopupForm
        title={ingredientsToEdit ? "Edit ingredients" : "Add ingredients"}
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        onSubmit={ingredientsToEdit ? handleEdit : handleAdd}
        fields={[
          {
            labelText: "Ingredients Name",
            inputType: "text",
            placeholder: "Enter ingredients name",
            name: "name",
            defaultValue: ingredientsToEdit ? ingredientsToEdit.name : "",
          },
          {
            labelText: "Quantity",
            inputType: "text",
            placeholder: "Enter quantity",
            name: "quantity",
            defaultValue: ingredientsToEdit ? ingredientsToEdit.quantity : "",
          },
        ]}
      />
    </DashboardLayout>
  );
}

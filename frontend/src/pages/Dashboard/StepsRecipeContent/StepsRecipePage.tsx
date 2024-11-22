import { useParams } from "react-router-dom";
import TitleDashboardContent from "../../../components/dashboard/TitleDashboardContent";
import DashboardLayout from "../../../layout/Dashboard";
import { useEffect, useState } from "react";
import { getAllSteps } from "./lib/data";
import SearchInputTable from "../../../components/table/SearchInputTable";
import AddButtonTable from "../../../components/table/AddButtonTable";
import PopupForm from "../../../components/form/popupForm";
import {
  handleAddSteps,
  handleDeleteSteps,
  handleEditSteps,
} from "./lib/action";
import Table from "../../../components/table/Table";
import ButtonActionTable from "../../../components/table/ButtonActionTable";

interface StepsType {
  id: string;
  step_number: string;
  instruction: string;
}

export default function StepsRecipeDashboardPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<StepsType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [stepToEdit, setstepToEdit] = useState<StepsType | null>(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const res = await getAllSteps(id!);
          console.log(res)
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

  const handleOpenPopup = (steps?: {
    id: string;
    step_number: string;
    instruction: string;
  }) => {
    if (steps) {
      setstepToEdit(steps);
    } else {
      setstepToEdit(null);
    }
    setIsPopupOpen(true);
  };
  const handleClosePopup = () => setIsPopupOpen(false);

  const handleAdd = async (formData: { [key: string]: string }) => {
    await handleAddSteps(id!, formData, setData, setIsLoading);
    handleClosePopup();
  };

  const handleEdit = async (formData: { [key: string]: string }) => {
    if (stepToEdit) {
      await handleEditSteps(
        id!,
        stepToEdit.id,
        formData,
        setData,
        setIsLoading
      );
      handleClosePopup();
    }
  };

  const filteredRows = data
    .filter((item) =>
      item.instruction.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .map((item) => ({
      id: item.id,
      step_number: item.step_number,
      instruction: item.instruction,
    }));

  return (
    <DashboardLayout>
      <TitleDashboardContent>Steps</TitleDashboardContent>

      <div className="flex items-center justify-between mx-2 sm:mx-6 mt-2">
        <SearchInputTable
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search..."
        />
        <AddButtonTable
          onClick={() => handleOpenPopup()}
          label="Add Instruction"
        />
      </div>

      <Table
        headers={["Step Number", "Instruction", "Action"]}
        rows={filteredRows}
        action={(row) => (
          <ButtonActionTable
            onEdit={() =>
              handleOpenPopup({
                id: row.id,
                step_number: row.step_number,
                instruction: row.instruction,
              })
            }
            onDelete={() =>
              handleDeleteSteps(id!, row.id, setIsLoading, setData)
            }
          />
        )}
        loading={isLoading}
      />

      <PopupForm
        title={stepToEdit ? "Edit instruction" : "New Instruction"}
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        onSubmit={stepToEdit ? handleEdit : handleAdd}
        fields={[
          {
            labelText: `Step ${stepToEdit ? stepToEdit.step_number : data.length + 1}`,
            inputType: "text",
            placeholder: "Enter instruction",
            name: "instruction",
            defaultValue: stepToEdit ? stepToEdit.instruction : "",
          },
        ]}
      />
    </DashboardLayout>
  );
}

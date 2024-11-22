import TitleDashboardContent from "../../../components/dashboard/TitleDashboardContent";
import DashboardLayout from "../../../layout/Dashboard";
import EditRecipeForm from "./components/EditRecipeForm";

export default function EditRecipeDashboardPage() {
    return (
        <DashboardLayout>
            <TitleDashboardContent>Edit Recipe</TitleDashboardContent>

            <EditRecipeForm />
        </DashboardLayout>
    )
}
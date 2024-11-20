import TitleDashboardContent from "../../../components/dashboard/TitleDashboardContent";
import DashboardLayout from "../../../layout/Dashboard";
import CreateRecipeForm from "./components/CreateRecipeForm";


export default function CreateRecipeDashboardPage() {
    return (
        <DashboardLayout>
            <TitleDashboardContent>Create Recipe</TitleDashboardContent>

            <CreateRecipeForm />
        </DashboardLayout>
    )
}
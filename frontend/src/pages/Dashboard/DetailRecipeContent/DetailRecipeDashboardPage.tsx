import { useParams } from "react-router-dom";
import TitleDashboardContent from "../../../components/dashboard/TitleDashboardContent";
import DashboardLayout from "../../../layout/Dashboard";
import { useEffect, useState } from "react";
import { getDetailRecipe } from "./lib/data";
import { RecipeDetailType } from "./lib/type";
import SkeletonDetailRecipeDashboard from "./lib/skeleton";

export default function DetailRecipeDashboardPage() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<RecipeDetailType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const res = await getDetailRecipe(id);
        setData(res.data);
        console.log(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <SkeletonDetailRecipeDashboard />

  if (!data) {
    return (
      <DashboardLayout>
        <TitleDashboardContent>Recipe Not Found</TitleDashboardContent>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <TitleDashboardContent>Detail Recipe</TitleDashboardContent>
      <div className="mx-2 sm:mx-6 flex flex-col lg:flex-row gap-6">
        <div className="flex-shrink-0">
          <img
            src={data.image.imageUrl}
            alt={data.title}
            className="w-full h-auto md:w-full lg:w-[600px] rounded-lg shadow-lg"
          />
        </div>

        <div className="flex flex-col flex-1">
          <h2 className="sm:text-xl text-base font-semibold">{data.title}</h2>
          <h2 className="sm:text-base text-sm font-medium text-gray-800">{data.category.name}</h2>
          <p className="text-gray-600 text-xs sm:text-sm">{data.description}</p>
          <p className="mt-4 text-xs sm:text-base font-semibold">
            <span className="font-medium text-gray-700">Cooking Time :</span>{" "}
            {data.cooking_time} minutes
          </p>
          <p className="text-xs sm:text-base font-semibold">
            <span className="font-medium text-gray-700">Servings :</span>{" "}
            {data.servings}
          </p>

          <h3 className="font-medium mt-6 text-xs sm:text-base text-gray-700">
            Ingredients
          </h3>
          <ul className="list-item list-inside mt-1 sm:mt-2">
            {data.ingredients.map((ingredient) => (
              <li key={ingredient._id} className="font-semibold text-[10px] sm:text-sm">
                {ingredient.name} <span className="text-gray-700">({ingredient.quantity})</span>
              </li>
            ))}
          </ul>

          <h3 className="font-medium mt-6 text-xs sm:text-base text-gray-700">
            Steps
          </h3>
          <ul className="list-none list-inside mt-1 sm:mt-2">
            {data.steps.map((step) => (
              <li key={step._id} className="font-semibold text-[10px] sm:text-sm">
                {step.step_number}. {step.instruction}
              </li>
            ))}
          </ul>

          <h3 className="font-medium mt-6 text-xs sm:text-base text-gray-700">
            Author
          </h3>
          <div className="flex items-center mt-2">
            <img
              src={data.user.image.imageUrl}
              alt={data.user.name}
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <p className="font-semibold text-gray-700 text-sm sm:text-base">
                {data.user.name}
              </p>
              <p className="text-gray-600 text-[10px] sm:text-xs font-medium">
                {data.user.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

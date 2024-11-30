import { useParams } from "react-router-dom";
import Navbar from "../../../layout/Navbar";
import Container from "../../../components/container/Container";
import { useEffect, useState } from "react";
import { getDetailRecipe } from "../../Dashboard/DetailRecipeContent/lib/data";
import RecipeDetails from "./components/RecipeDetails";
import { RecipeDetailType } from "../../Dashboard/DetailRecipeContent/lib/type";
import RecipeDetailsSkeleton from "./skeleton/RecipeDetailsSkeleton";
import Footer from "../../../layout/Footer";
import Breadcrumb from "./components/Breadcrumb";
import BreadcrumbSkeleton from "./skeleton/BreadcrumbSkeleton";
import RecipeSteps from "./components/RecipeSteps";
import RecipeStepsSkeleton from "./skeleton/RecipeStepsSkeleton";

export default function DetailRecipe() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<RecipeDetailType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const res = await getDetailRecipe(id);
        setData(res.data);
      } catch (e) {
        console.error(e);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (!loading && !data) {
    return (
      <div className="bg-white">
        <Navbar />
        <Container>
          <div className="pt-20 md:pt-28 lg:pt-40 text-center text-gray-500 text-lg">
            Recipe Not Found
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <Navbar />
      <Container>
        <div className="pt-20 md:pt-28 lg:pt-40 pb-12">
          {loading ? (
            <>
              <BreadcrumbSkeleton />
              <RecipeDetailsSkeleton />
              <RecipeStepsSkeleton />
            </>
          ) : (
            <>
              <Breadcrumb category={data!.category} recipeTitle={data!.title} />
              <RecipeDetails data={data!} />
              <RecipeSteps data={data!} />
            </>
          )}
        </div>
      </Container>
      <Footer />
    </div>
  );
}
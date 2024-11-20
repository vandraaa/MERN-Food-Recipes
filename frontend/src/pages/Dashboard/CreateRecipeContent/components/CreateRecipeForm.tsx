import { useEffect, useState } from "react";
import InputWithLabel from "../../../../components/form/inputWithLabel";
import TextAreaWithLabel from "../../../../components/form/textAreaWithLabel";
import { getCategory } from "../../CategoryContent/lib/data";
import Button from "../../../../components/form/button";
import SelectWithLabel from "../../../../components/form/selectWithLable";
import FileUploadWithPreview from "../../../../components/form/fileUploadWithPreview";
import { createRecipeSchema } from "../lib/validation";
import { createNewRecipe, formDataCreateRecipe } from "../lib/data";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useToast } from "../../../../context/ToastContext";

interface Category {
  id: string;
  name: string;
}

export default function CreateRecipeForm() {
  const [formData, setFormData] = useState<formDataCreateRecipe>({
    title: "",
    categoryId: "",
    description: "",
    servings: "",
    cookingTime: "",
    image: null,
  });
  const [dataCategory, setDataCategory] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const navigate = useNavigate();
  const { toastSuccess } = useToast();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: [] }));
  };

  const handleFileChange = (file: File | null) => {
    setFormData((prevData) => ({ ...prevData, image: file || null }));
    setErrors((prevErrors) => ({ ...prevErrors, image: [] }));
  };

  const fetchCategories = async () => {
    try {
      const res = await getCategory();
      if (res.status === "success") {
        setDataCategory(res.data);
      } else {
        console.error("Failed to fetch categories:", res.message);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const validateFormData = () => {
    const validation = createRecipeSchema.safeParse(formData);
    if (!validation.success) {
      const newErrors: Record<string, string[]> = {};
      validation.error.errors.forEach((error) => {
        const key = error.path[0] as string;
        newErrors[key] = newErrors[key] || [];
        newErrors[key].push(error.message);
      });
      setErrors(newErrors);
      return false;
    }
    return true;
  };

  const handleCreateRecipe = async () => {
    if (!validateFormData()) return;

    try {
      setIsLoading(true);
      const res = await createNewRecipe(formData);
      if (res.status === "success") {
        toastSuccess(res.message);
        navigate("/dashboard/draft-recipes");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: res.error.message,
          confirmButtonText: "OK!",
        });
      }
    } catch (error) {
      console.error("Error creating recipe:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="mx-2 sm:mx-6">
      <div className="flex flex-col w-full sm:gap-y-6 gap-y-4">
        <div className="flex gap-x-6 sm:gap-y-0 gap-y-4 flex-col sm:flex-row">
          <InputWithLabel
            onChange={handleChange}
            labelText="Recipe Name"
            inputType="text"
            name="title"
            placeholder="Recipe Name..."
            value={formData.title}
            error={errors?.title?.[0]}
          />

          <SelectWithLabel
            labelText="Category"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            options={dataCategory.map((category) => ({
              label: category.name,
              value: category.id,
            }))}
            error={errors?.categoryId?.[0]}
          />
        </div>
        <TextAreaWithLabel
          onChange={handleChange}
          labelText="Description"
          name="description"
          placeholder="Description..."
          value={formData.description}
          error={errors?.description?.[0]}
        />
        <div className="flex gap-x-6 sm:gap-y-0 gap-y-4 flex-col sm:flex-row">
          <InputWithLabel
            onChange={handleChange}
            labelText="Servings"
            inputType="number"
            name="servings"
            placeholder="Servings (e.g. 4)..."
            value={String(formData.servings || "")}
            error={errors?.servings?.[0]}
          />
          <InputWithLabel
            onChange={handleChange}
            labelText="Cooking Time (minutes)"
            inputType="number"
            name="cookingTime"
            placeholder="Cooking Time in minutes..."
            value={String(formData.cookingTime || "")}
            error={errors?.cookingTime?.[0]}
          />
        </div>
        <FileUploadWithPreview
          labelText={"Upload Recipe Image"}
          name="image"
          onChange={handleFileChange}
          error={errors?.image?.[0]}
        />
        <Button onClick={handleCreateRecipe} disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Recipe"}
        </Button>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import InputWithLabel from "../../../../components/form/inputWithLabel";
import TextAreaWithLabel from "../../../../components/form/textAreaWithLabel";
import { getCategory } from "../../CategoryContent/lib/data";
import Button from "../../../../components/form/button";
import SelectWithLabel from "../../../../components/form/selectWithLable";
import FileUploadWithPreview from "../../../../components/form/fileUploadWithPreview";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useToast } from "../../../../context/ToastContext";
import { editRecipeSchema } from "../lib/validation";
import { FormDataEditRecipe, updateRecipe } from "../lib/data";
import { getDetailRecipe } from "../../DetailRecipeContent/lib/data";

interface Category {
  id: string;
  name: string;
}

export default function EditRecipeForm() {
  const [formData, setFormData] = useState<FormDataEditRecipe>({
    title: "",
    category: {
      _id: "",
      name: "",
    },
    description: "",
    servings: "",
    cooking_time: "",
    image: null,
  });
  const [dataCategory, setDataCategory] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const navigate = useNavigate();
  const { toastSuccess } = useToast();
  const { id } = useParams();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "servings" || name === "cooking_time") {
      const numericValue = value
        ? isNaN(Number(value))
          ? ""
          : Number(value)
        : "";
      setFormData((prevData) => ({ ...prevData, [name]: numericValue }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: [] }));
  };

  const handleFileChange = (file: File | null) => {
    setFormData((prevData) => ({ ...prevData, image: file || null }));
    setErrors((prevErrors) => ({ ...prevErrors, image: [] }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const selectedCategory = dataCategory.find(
      (category) => category.id === value
    );
    if (selectedCategory) {
      setFormData((prevData) => ({
        ...prevData,
        category: {
          _id: selectedCategory.id,
          name: selectedCategory.name,
        },
      }));
    }
    setErrors((prevErrors) => ({ ...prevErrors, categoryId: [] }));
  };

  const fetchData = async () => {
    try {
      const res = await getDetailRecipe(id!);
      if (res.status === "success") {
        setFormData(res.data);
      } else {
        console.error("Failed to fetch categories:", res.message);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
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
    const dataToValidate = {
      ...formData,
      category: formData.category._id,
    };

    const validation = editRecipeSchema.safeParse(dataToValidate);
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

  const handleUpdateRecipe = async () => {
    const isValid = validateFormData();
    console.log("Form validation result:", isValid);
    if (!isValid) return;

    try {
      setIsLoading(true);
      const res = await updateRecipe(id!, formData);
      if (res.status === "success") {
        toastSuccess(res.message);
        navigate(`/dashboard/detail-recipe/${id}`);
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
    fetchData();
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
            value={formData.category._id}
            onChange={handleCategoryChange}
            options={dataCategory.map((category) => ({
              label: category.name,
              value: category.id,
            }))}
            error={errors?.category?.[0]}
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
            name="cooking_time"
            placeholder="Cooking Time in minutes..."
            value={String(formData.cooking_time || "")}
            error={errors?.cooking_time?.[0]}
          />
        </div>
        <FileUploadWithPreview
          labelText={"Upload Recipe Image"}
          name="image"
          onChange={handleFileChange}
          error={errors?.image?.[0]}
        />
        <Button onClick={handleUpdateRecipe} disabled={isLoading}>
          {isLoading ? "Updating..." : "Update Recipe"}
        </Button>
      </div>
    </div>
  );
}

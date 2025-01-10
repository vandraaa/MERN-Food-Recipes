import { useEffect, useState } from "react";
import { getCategory } from "../../../Dashboard/CategoryContent/lib/data";

interface CategoryButtonsProps {
  selectedCategory: string;
  handleCategoryClick: (id: string) => void;
}

interface CategoryType {
  id: string;
  name: string;
}

const CategoryButtons = ({
  selectedCategory,
  handleCategoryClick,
}: CategoryButtonsProps) => {
  const [data, setData] = useState<CategoryType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getCategory();
      const categoriesWithDefault = [
        { id: "all", name: "All" },
        ...res.data,
      ];
      setData(categoriesWithDefault);
    };
    fetchData();
  }, []);

  return (
    <div className="mt-6 w-full max-w-4xl mx-auto overflow-x-auto scrollbar-hide">
      <div className="flex gap-2.5 md:gap-4">
        {data.map((category) => (
          <div
            key={category.id}
            className={`flex-shrink-0 w-auto px-4 py-1.5 text-xs md:text-base border rounded-lg text-center shadow-md cursor-pointer ${
              selectedCategory === category.id
                ? "bg-slate-600 text-white border-gray-bg-slate-600"
                : "bg-white text-gray-800 hover:bg-gray-100"
            }`}
            onClick={() => handleCategoryClick(category.id)}
          >
            {category.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryButtons;

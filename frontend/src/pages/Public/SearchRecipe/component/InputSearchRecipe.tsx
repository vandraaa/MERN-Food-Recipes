import { FiSearch } from "react-icons/fi";

interface SearchInputProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export default function InputSearchRecipe({ searchTerm, setSearchTerm }: SearchInputProps) {
  return (
    <div className="md:mt-8 mt-6 w-full max-w-4xl mx-auto">
      <div className="relative text-xs md:text-base">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          className="w-full px-10 py-1.5 md:py-2 border-[0.5px] rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

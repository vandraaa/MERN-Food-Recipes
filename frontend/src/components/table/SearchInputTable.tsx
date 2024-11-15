import { FaSearch } from "react-icons/fa";

interface SearchInputTableProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchInputTable({ value, onChange, placeholder = "Search..." }: SearchInputTableProps) {
  return (
    <div className="relative w-[55%] max-w-xs sm:text-base text-xs">
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
      <input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-1.5 sm:py-2 border border-gray-300 rounded-2xl outline-none focus:border-gray-500"
      />
    </div>
  );
}

interface SelectWithLabelProps {
    labelText: string;
    value: string;
    name: string;
    options: { label: string; value: string }[];
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    error?: string;
    classnames?: string;
  }
  
  export default function SelectWithLabel({
    labelText,
    value,
    name,
    options,
    onChange,
    error,
    classnames,
  }: SelectWithLabelProps) {
    return (
      <div className={`w-full relative ${classnames}`}>
        <p className="text-gray-600 font-semibold text-sm md:text-base lg:text-lg">
          {labelText}
        </p>
        <div className="relative mt-2">
          <select
            name={name}
            value={value}
            onChange={onChange}
            className="w-full text-sm border-2 border-gray-300 rounded-2xl px-5 py-1.5 lg:px-5 lg:py-2.5 outline-none focus:border-gray-500"
          >
            <option value="" disabled>
              -- Select an option --
            </option>
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {error && <p className="text-red-500 text-xs mt-1.5 ml-2">{error}</p>}
      </div>
    );
  }
  
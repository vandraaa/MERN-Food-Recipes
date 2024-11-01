import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface InputWithLabelProps {
  labelText: string;
  inputType: string;
  placeholder: string;
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export default function InputWithLabel({
  labelText,
  inputType,
  placeholder,
  value,
  name,
  onChange,
  error,
}: InputWithLabelProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className="w-full relative">
      <p className="text-gray-600 font-semibold text-sm md:text-base lg:text-lg">
        {labelText}
      </p>
      <div className="relative mt-2">
        <input
          type={inputType === "password" && isPasswordVisible ? "text" : inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          className="w-full text-sm border-2 border-gray-300 rounded-2xl px-5 py-1.5 lg:px-5 lg:py-2.5 outline-none focus:border-gray-500"
        />
        {inputType === "password" && (
          <span
            onClick={togglePasswordVisibility}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer text-gray-600 font-medium"
          >
            {isPasswordVisible ? <FiEye /> : <FiEyeOff />}
          </span>
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1.5 ml-2">{error}</p>}
    </div>
  );
}

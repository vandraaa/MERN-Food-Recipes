import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import InputWithLabel from "./inputWithLabel";

interface PopupFormProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: { [key: string]: string }) => void;
  fields: Array<{
    labelText: string;
    inputType: string;
    placeholder: string;
    name: string;
    defaultValue?: string;
  }>;
}

export default function PopupForm({
  title,
  isOpen,
  onClose,
  onSubmit,
  fields,
}: PopupFormProps) {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [animateOpen, setAnimateOpen] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (isOpen) {
      setAnimateOpen(true);
      const initialData = fields.reduce(
        (acc, field) => ({ ...acc, [field.name]: field.defaultValue || "" }),
        {}
      );
      setFormData(initialData);
    } else if (!isOpen && animateOpen) {
      const timer = setTimeout(() => setAnimateOpen(false), 500);
      return () => clearTimeout(timer);
    }
  }, [fields, isOpen, animateOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (value.trim() !== "") {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    fields.forEach((field) => {
      if (!formData[field.name]?.trim()) {
        newErrors[field.name] = "This field is required";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
    onClose();
  };

  if (!isOpen && !animateOpen) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 transition-opacity duration-500 ${
        isOpen && animateOpen ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-white w-11/12 max-w-md p-6 rounded-xl shadow-lg relative max-h-[80vh] overflow-hidden transform transition-transform duration-500 ${
          isOpen && animateOpen ? "translate-y-0 scale-100" : "-translate-y-10 scale-95"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          <FiX size={24} />
        </button>
        <h2 className="text-base sm:text-xl font-semibold text-center mb-6">
          {title}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="overflow-y-auto max-h-[50vh] px-2 scrollbar-thin">
            {fields.map((field) => (
              <InputWithLabel
                key={field.name}
                labelText={field.labelText}
                inputType={field.inputType}
                placeholder={field.placeholder}
                value={formData[field.name] || ""}
                name={field.name}
                onChange={handleInputChange}
                classnames="mb-5"
                error={errors[field.name]}
              />
            ))}
          </div>
          <button
            type="submit"
            className="mt-6 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

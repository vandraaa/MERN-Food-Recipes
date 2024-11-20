interface TextAreaWithLabelProps {
  labelText: string;
  placeholder: string;
  value: string;
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  classnames?: string;
  rows?: number;
}

export default function TextAreaWithLabel({
  labelText,
  placeholder,
  value,
  name,
  onChange,
  error,
  classnames,
  rows = 4,
}: TextAreaWithLabelProps) {
  return (
    <div className={`w-full relative ${classnames}`}>
      <p className="text-gray-600 font-semibold text-sm md:text-base lg:text-lg">
        {labelText}
      </p>
      <div className="relative mt-2">
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          rows={rows}
          className="w-full text-sm border-2 border-gray-300 rounded-2xl px-5 py-1.5 lg:px-5 lg:py-2.5 outline-none focus:border-gray-500 resize-none"
        ></textarea>
      </div>
      {error && <p className="text-red-500 text-xs mt-1.5 ml-2">{error}</p>}
    </div>
  );
}

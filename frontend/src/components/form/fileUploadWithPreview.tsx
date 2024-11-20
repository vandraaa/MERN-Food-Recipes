import React, { useState } from "react";

interface FileUploadWithPreviewProps {
  labelText: string;
  name: string;
  onChange?: (file: File | null) => void;
  error?: string;
  classnames?: string;
}

export default function FileUploadWithPreview({
  labelText,
  name,
  onChange,
  error,
  classnames,
}: FileUploadWithPreviewProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }

    if (onChange) {
      onChange(file);
    }
  };

  return (
    <div className={`w-full relative ${classnames}`}>
      <p className="text-gray-600 font-semibold text-sm md:text-base lg:text-lg">
        {labelText}
      </p>
      {preview && (
        <div className="mt-4">
          <img
            src={preview}
            alt="Preview"
            className="w-full max-w-sm rounded-lg shadow-lg"
          />
        </div>
      )}
      <div className="relative mt-2">
        <input
          type="file"
          name={name}
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
        />
      </div>
      {error && <p className="text-red-500 text-xs mt-1.5 ml-2">{error}</p>}
    </div>
  );
}

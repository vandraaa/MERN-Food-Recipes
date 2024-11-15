interface AddButtonTableProps {
    onClick: () => void;
    label?: string;
  }
  
  export default function AddButtonTable({ onClick, label = "Add" }: AddButtonTableProps) {
    return (
      <button
        onClick={onClick}
        className="bg-blue-500 text-white text-[10px] sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded hover:bg-blue-600"
      >
        + {label}
      </button>
    );
  }
  
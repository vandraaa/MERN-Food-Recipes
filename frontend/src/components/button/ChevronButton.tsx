import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type ChevronButtonProps = {
  direction: "left" | "right";
  onClick: () => void;
  isVisible: boolean;
  classname?: string;
};

export default function ChevronButton({ direction, onClick, isVisible, classname }: ChevronButtonProps) {
  if (!isVisible) return null;

  return (
    <button
      onClick={onClick}
      className={`${classname} absolute top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full text-gray-600 hover:text-gray-900 ${
        direction === "left" ? "left-0" : "right-0"
      }`}
      aria-label={`Scroll ${direction === "left" ? "Left" : "Right"}`}
    >
      {direction === "left" ? <FaChevronLeft /> : <FaChevronRight />}
    </button>
  );
}
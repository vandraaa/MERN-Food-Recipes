import { MouseEventHandler } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const EditButton = ({ onClick }: { onClick: MouseEventHandler<HTMLButtonElement> }) => {
    return (
        <button 
        className="flex items-center text-blue-500 hover:text-blue-700 mr-4" 
        onClick={onClick}>
            <FaEdit className="mr-1" /> Edit
        </button>
    )
};

const DeleteButton = ({ onClick }: { onClick: MouseEventHandler<HTMLButtonElement> }) => {
    return (
        <button 
        className="flex items-center text-red-500 hover:text-red-700" 
        onClick={onClick}>
            <FaTrash className="mr-1" /> Delete
        </button>
    )
};

interface ButtonActionProps {
    onEdit: MouseEventHandler<HTMLButtonElement>;
    onDelete: MouseEventHandler<HTMLButtonElement>;
}

const ButtonAction = ({ onEdit, onDelete }: ButtonActionProps) => {
    return (
        <div className="flex items-center gap-2">
            <EditButton onClick={onEdit} />
            <DeleteButton onClick={onDelete} />
        </div>
    )
};

export default ButtonAction;
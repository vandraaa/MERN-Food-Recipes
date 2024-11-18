import { MouseEventHandler } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

const EditButton = ({ onClick }: { onClick?: MouseEventHandler<HTMLButtonElement> }) => {
    return (
        <button
            className="flex items-center text-blue-500 hover:text-blue-700"
            onClick={onClick}
            disabled={!onClick}
        >
            <FaEdit className="mr-1" /> Edit
        </button>
    );
};

const DeleteButton = ({ onClick }: { onClick?: MouseEventHandler<HTMLButtonElement> }) => {
    return (
        <button
            className="flex items-center text-red-500 hover:text-red-700"
            onClick={onClick}
            disabled={!onClick}
        >
            <FaTrash className="mr-1" /> Delete
        </button>
    );
};

const DetailButton = ({ onClick }: { onClick?: MouseEventHandler<HTMLButtonElement> }) => {
    return (
        <button
            className="flex items-center text-gray-500 hover:text-red-700"
            onClick={onClick}
            disabled={!onClick}
        >
            <FaEye className="mr-1" /> Detail
        </button>
    );
};

interface ButtonActionProps {
    onEdit?: MouseEventHandler<HTMLButtonElement>;
    onDelete?: MouseEventHandler<HTMLButtonElement>;
    onDetail?: MouseEventHandler<HTMLButtonElement>;
}

const ButtonActionTable = ({ onEdit, onDelete, onDetail }: ButtonActionProps) => {
    return (
        <div className="flex items-center justify-center gap-x-4 h-full text-center">
            {onDetail && <DetailButton onClick={onDetail} />}
            {onEdit && <EditButton onClick={onEdit} />}
            {onDelete && <DeleteButton onClick={onDelete} />}
        </div>
    );
};

export default ButtonActionTable;
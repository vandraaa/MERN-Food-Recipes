import { MouseEventHandler } from "react"

const ButtonApproved = ({ onClick }: { onClick?: MouseEventHandler<HTMLButtonElement> }) => {
    return (
        <div className="flex items-center justify-center gap-x-4 h-full text-center">
            <button className="bg-green-500 hover:bg-green-600 py-1.5 sm:py-2 px-4 sm:px-6 rounded-full text-white font-medium text-[10px] sm:text-sm"
            onClick={onClick}
            disabled={!onClick}
            >Approve</button>
        </div>
    )
}

const ButtonRejected = ({ onClick }: { onClick?: MouseEventHandler<HTMLButtonElement> }) => {
    return (
        <div className="flex items-center justify-center gap-x-4 h-full text-center">
            <button className="bg-red-500 hover:bg-red-600 py-1.5 sm:py-2 px-4 sm:px-6 rounded-full text-white font-medium text-[10px] sm:text-sm"
            onClick={onClick}
            disabled={!onClick}
            >Reject</button>
        </div>
    )
}

const ButtonApply = ({ onClick }: { onClick?: MouseEventHandler<HTMLButtonElement> }) => {
    return (
        <div className="flex items-center justify-center gap-x-4 h-full text-center">
            <button className="bg-blue-500 hover:bg-blue-600 py-1.5 sm:py-2 px-4 sm:px-6 rounded-full text-white font-medium text-[10px] sm:text-sm"
            onClick={onClick}
            disabled={!onClick}
            >Apply Again</button>
        </div>
    )
}

const ButtonDraftApply = ({ onClick }: { onClick?: MouseEventHandler<HTMLButtonElement> }) => {
    return (
        <div className="flex items-center justify-center gap-x-4 h-full text-center">
            <button className="bg-blue-500 hover:bg-blue-600 py-1.5 sm:py-2 px-4 sm:px-6 rounded-full text-white font-medium text-[10px] sm:text-sm"
            onClick={onClick}
            disabled={!onClick}
            >Apply</button>
        </div>
    )
}

interface ButtonUpdateStatusProps {
    onApproved?: MouseEventHandler<HTMLButtonElement>, 
    onRejected?: MouseEventHandler<HTMLButtonElement>,
    onApply?: MouseEventHandler<HTMLButtonElement>,
    onDraftApply?: MouseEventHandler<HTMLButtonElement>,
}

const ButtonUpdateStatus = ({ onApproved, onRejected, onApply, onDraftApply }: ButtonUpdateStatusProps) => {
    return (
        <div className="flex items-center justify-center gap-x-2 sm:gap-x-4 px-4 h-full text-center">
            {onApproved && <ButtonApproved onClick={onApproved} />}
            {onApply && <ButtonApply onClick={onApply} />}
            {onRejected && <ButtonRejected onClick={onRejected} />}
            {onDraftApply && <ButtonDraftApply onClick={onDraftApply} />}
        </div>
    )
}

export default ButtonUpdateStatus
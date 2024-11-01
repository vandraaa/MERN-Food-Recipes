import React from "react"

interface ButtonProps {
    children: React.ReactNode,
    onClick: () => void
}

export default function Button({ children, onClick }: ButtonProps) {
    return (
        <div className="w-full">
            <button
                className="w-full text-white bg-black py-2 px-3 lg:py-3 lg:px-6 text-xs lg:text-base font-semibold rounded-2xl"
                onClick={onClick}
            >
                {children}
            </button>
        </div>
    )
}
import { ReactNode } from "react";

interface ContainerProps {
    children?: ReactNode,
    className?: string
}

export default function Container({ children, className = '' }: ContainerProps) {
  return (
    <div
      className={`w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] mx-auto p-4 md:p-6 ${className}`}
    >
      {children}
    </div>
  );
}

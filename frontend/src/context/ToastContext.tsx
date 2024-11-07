import { createContext, useContext, useState, ReactNode } from "react";
import { showSuccessToast } from "../components/toast/toast";

interface ToastContextType {
  toastSuccess: (message: string) => void;
  clearToast: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const toastSuccess = (message: string) => {
    setToastMessage(message);
    showSuccessToast(message);
    console.log(toastMessage)   
  };

  const clearToast = () => setToastMessage(null);

  return (
    <ToastContext.Provider value={{ toastSuccess, clearToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};  
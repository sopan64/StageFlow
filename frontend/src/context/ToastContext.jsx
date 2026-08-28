import { createContext, useContext, useState, useCallback } from "react";
import "../styles/Toast.css";

const ToastContext = createContext(null);

let idCounter = 0;

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const dismissToast = useCallback((id) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, []);

    // type: "error" | "success" | "info"
    // duration: ms before auto-dismiss, or 0 to require manual close
    const showToast = useCallback((message, type = "info", duration = 4000) => {
        const id = ++idCounter;
        setToasts((prevToasts) => [...prevToasts, { id, message, type }]);

        if (duration) {
            setTimeout(() => dismissToast(id), duration);
        }
    }, [dismissToast]);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            <div className="toast-container">
                {toasts.map((toast) => (
                    <div key={toast.id} className={`toast toast-${toast.type}`}>
                        <span>{toast.message}</span>
                        <button
                            className="toast-close"
                            onClick={() => dismissToast(toast.id)}
                            aria-label="Dismiss"
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
}
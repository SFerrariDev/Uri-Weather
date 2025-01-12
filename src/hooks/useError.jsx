import { useState } from "react";

export function useError() {
    const [globalError, setGlobalError] = useState(null);

    const handleError = (errorInstance) => {
        const serializedError = {
            name: errorInstance.name,
            message: errorInstance.message,
            details: errorInstance.details,
        };
        setGlobalError(serializedError);
    };

    const clearError = () => {
        setGlobalError(null);
    };

    return { globalError, handleError, clearError }
}
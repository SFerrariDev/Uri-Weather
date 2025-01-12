import { createContext, useContext } from "react";
import { useError } from '../hooks/useError'

const ErrorContext = createContext();

export const useErrorContext = () => useContext(ErrorContext);

export const ErrorProvider = ({ children }) => {
    const { globalError, handleError, clearError } = useError();

    return (
        <ErrorContext.Provider value={{ globalError, handleError, clearError }}>
            {children}
        </ErrorContext.Provider>
    )
}
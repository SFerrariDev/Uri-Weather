import { createContext, useContext } from 'react';
import { useSearch } from '../hooks/useSearch';

const SearchContext = createContext();

export const useSearchContext = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
    const { search, setSearch, isFirstInput, setIsFirstInput, validSearch, loading, setLoading } = useSearch();

    return (
        <SearchContext.Provider value={{ search, setSearch, isFirstInput, setIsFirstInput, validSearch, loading, setLoading }}>
            {children}
        </SearchContext.Provider>
    );
};

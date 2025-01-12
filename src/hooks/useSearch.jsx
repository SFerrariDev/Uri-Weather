import { useState } from "react"

export const useSearch = () => {
    const [search, setSearch] = useState('');
    const [isFirstInput, setIsFirstInput] = useState(true)
    const [loading, setLoading] = useState(null);

    function validSearch(search) {
        const pattern = new RegExp(/^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ\s]+$/);
    
        if (!pattern.test(search)) {
            return false
        }
    
        if (!search) return false
    
        if (search.length < 3) {
            return false
        }
        return true
    }

    return {search, setSearch, isFirstInput, setIsFirstInput, validSearch, loading, setLoading};
}
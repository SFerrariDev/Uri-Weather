import { getWeather, getForecast } from '../services/fetchWeather'
import { useSearchContext } from '../context/SearchContext';
import { useWeatherContext } from '../context/WeatherContext';
import { useForecastContext } from '../context/ForecastContext';
import { useErrorContext } from '../context/ErrorContext';

export function useHeaderLogic() {

    const { search, setSearch, setIsFirstInput, validSearch, setLoading } = useSearchContext();
    const { setWeather } = useWeatherContext();
    const { setDaysForecast, setHourlyForecast } = useForecastContext();
    const { handleError, clearError } = useErrorContext();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsFirstInput(false);
        clearError();
        const newWeather = await getWeather(search, setLoading, handleError);
        const newForecast = await getForecast(search, setLoading, handleError);
        if(!newWeather || !newForecast) return;
        setWeather(newWeather);
        setHourlyForecast(newForecast.hourlyForecast);
        setDaysForecast(newForecast.daysForecast);
    }

    const handleChange = (event) => {
        if (validSearch(event.target.value)) setSearch(event.target.value);
    }

    return { handleSubmit, handleChange };
}
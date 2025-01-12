import { createContext, useContext } from "react";
import { useForecast } from "../hooks/useForecast";

const ForecastContext = createContext();

export const useForecastContext = () => useContext(ForecastContext);

export const ForecastProvider = ({ children }) => {
    const { daysForecast, setDaysForecast, hourlyForecast, setHourlyForecast } = useForecast();

    return (
        <ForecastContext.Provider value={{ daysForecast, setDaysForecast, hourlyForecast, setHourlyForecast }}>
            {children}
        </ForecastContext.Provider>
    )
}
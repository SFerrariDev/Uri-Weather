import { createContext, useContext } from 'react'
import { useWeather } from '../hooks/useWeather'

const WeatherContext = createContext()

export const useWeatherContext = () => useContext(WeatherContext)

export const WeatherProvider = ({ children }) => {
	const { weather, setWeather } = useWeather()

	return (
		<WeatherContext.Provider value={{ weather, setWeather }}>
			{children}
		</WeatherContext.Provider>
	)
}

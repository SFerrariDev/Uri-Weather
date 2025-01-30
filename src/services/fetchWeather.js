import { getFormattedDate } from '../helpers/getFormattedDate'
import { getFormattedHour } from '../helpers/getFormattedHour'
import { getDescription } from '../helpers/getDescription'
import { getUvIndex } from '../helpers/getUvIndex'
import { getDay } from '../helpers/getDay'
import { ApiError } from '../errors/error'

const BASE_URL = `https://api.tomorrow.io/v4/weather`
const API_KEY = 'IZTtvyEHqg6ZgBsvMN8hwvyVB8fR8duI'

async function fetchWeatherData(endpoint, search, setLoading, handleError) {
	const API_URL = `${BASE_URL}/${endpoint}?location=${search}&apikey=${API_KEY}`
	try {
		setLoading(true)
		const response = await fetch(API_URL)

		if (!response.ok) {
			let errorMessage = `HTTP ${response.status}: ${response.statusText}`
			if (response.status === 400) {
				errorMessage =
					'Las entradas proporcionadas como parámetros no eran válidas para la solicitud.'
			} else if (response.status === 401) {
				errorMessage = 'Clave de API inválida.'
			} else if (response.status === 404) {
				errorMessage = 'No se encontraron datos para esta ubicación.'
			} else if (response.status === 500) {
				errorMessage = 'Error interno en el servidor.'
			}
			throw new ApiError(errorMessage)
		}

		const apiData = await response.json()
		return apiData
	} catch (error) {
		handleError({
			name: error.name,
			message:
				'Lo sentimos, pero ocurrio un error inesperado. Por favor intentalo mas tarde.',
		})
		throw error
	} finally {
		setLoading(false)
	}
}

export async function getWeather(search, setLoading, handleError) {
	const weatherApiData = await fetchWeatherData(
		'realtime',
		search,
		setLoading,
		handleError
	)
	if (!weatherApiData) return

	return {
		formattedDate: getFormattedDate(weatherApiData.data.time),
		description: getDescription(weatherApiData.data.values.weatherCode),
		cloud: weatherApiData.data.values.cloudCover,
		humidity: weatherApiData.data.values.humidity,
		precipitation: weatherApiData.data.values.precipitationProbability,
		pressure: Math.round(weatherApiData.data.values.pressureSurfaceLevel),
		rainIntensity: weatherApiData.data.values.rainIntensity,
		temperature: Math.round(weatherApiData.data.values.temperature),
		feelsLike: Math.round(weatherApiData.data.values.temperatureApparent),
		uvIndex: getUvIndex(weatherApiData.data.values.uvIndex),
		uvConcern: weatherApiData.data.values.uvHealthConcern,
		code: weatherApiData.data.time,
		weatherCode: weatherApiData.data.values.weatherCode,
		city: weatherApiData.location.name,
		lat: weatherApiData.location.lat,
		lon: weatherApiData.location.lon,
	}
}

export async function getForecast(search, setLoading, handleError) {
	const forecastApiData = await fetchWeatherData(
		'forecast',
		search,
		setLoading,
		handleError
	)
	if (!forecastApiData) return

	const daysForecastArray = forecastApiData.timelines.daily
	const hourlyForecastArray = forecastApiData.timelines.hourly

	const daysForecast = daysForecastArray.map((day, index) => {
		const formattedDay = getDay()[index]
		const description = getDescription(day.values.weatherCodeMax)
		const temperature = Math.round(day.values.temperatureAvg)
		const maxTemperature = Math.round(day.values.temperatureMax)
		const minTemperature = Math.round(day.values.temperatureMin)
		const feelsLike = Math.round(day.values.temperatureApparentAvg)
		const precipitation = day.values.precipitationProbabilityAvg
		const uvIndex = getUvIndex(day.values.uvIndexAvg)
		const code = day.time
		const weatherCode = day.values.weatherCodeMax
		return {
			formattedDay,
			description,
			temperature,
			maxTemperature,
			minTemperature,
			feelsLike,
			precipitation,
			uvIndex,
			code,
			weatherCode,
		}
	})

	const hourlyForecast = hourlyForecastArray.map((hour) => {
		const date = getFormattedHour(hour.time)
		const description = getDescription(hour.values.weatherCode)
		const temperature = Math.round(hour.values.temperature)
		const feelsLike = Math.round(hour.values.temperatureApparent)
		const precipitation = hour.values.precipitationProbability
		const uvIndex = getUvIndex(hour.values.uvIndex)
		const code = hour.time
		const weatherCode = hour.values.weatherCode
		const humidity = hour.values.humidity
		return {
			date,
			description,
			temperature,
			feelsLike,
			precipitation,
			humidity,
			uvIndex,
			code,
			weatherCode,
		}
	})
	const limitedHourlyForecast = hourlyForecast.slice(1, 6)
	const forecast = { daysForecast, hourlyForecast: limitedHourlyForecast }
	return forecast
}

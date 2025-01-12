import { useSearchContext } from '../../context/SearchContext';
import { useErrorContext } from '../../context/ErrorContext';
import { useWeatherContext } from '../../context/WeatherContext'
import { useForecastContext } from '../../context/ForecastContext'
import { WeatherIcon } from '../WeatherIcon/WeatherIcon';
import { Loading } from '../Loading/Loading';
import { FirstInput } from '../FirstInput/FirstInput';
import icons from '@assets/svg/icons';
import './Main.css';

function CurrentWeather({ weather }) {
    return (
        <div className='currentWeather-container'>
            <div className="currentWeather">
                <h2 className='currentWeather-city title'>{weather.city}</h2>
                <span className='currentWeather-date'>{weather.formattedDate}</span>
                <div className='currentWeather-info'>
                    <WeatherIcon weatherCode={weather.weatherCode} />
                    <div className='temperature'>
                        <span>{weather.temperature}°C</span>
                        <p>{weather.description}</p>
                        <hr className='hr' />
                        <p>Sensación {weather.feelsLike}°C</p>
                    </div>
                </div>
            </div>

            <div className='currentWeather details'>
                <h2 className='title'>Detalles del clima</h2>
                <ul className='detailsList'>
                    <li className='detailsItem'>
                        <span>Probabilidad de lluvia</span>
                        <div className='detailsImgValue'>
                            <img src={icons.rainProbabilityImg} alt="Probabilidad de lluvia" />
                            <p>{weather.precipitation} %</p>
                        </div>
                    </li>
                    <li className='detailsItem'>
                        <span>Intensidad de lluvia</span>
                        <div className='detailsImgValue'>
                            <img src={icons.rainIntensityImg} alt="Cantidad de lluvia" />
                            <p>{weather.rainIntensity} mm/hr</p>
                        </div>
                    </li>
                    <li className='detailsItem'>
                        <span>Presión atmosférica</span>
                        <div className='detailsImgValue'>
                            <img src={icons.pressureImg} alt="Presión atmosférica" />
                            <p>{weather.pressure} hPa</p>
                        </div>
                    </li>
                    <li className='detailsItem'>
                        <span>Porcentaje de humedad</span>
                        <div className='detailsImgValue'>
                            <img src={icons.humidityImg} alt="Humedad" />
                            <p>{weather.humidity} %</p>
                        </div>
                    </li>
                    <li className='detailsItem'>
                        <span>Porcentaje de nubes</span>
                        <div className='detailsImgValue'>
                            <img src={icons.cloudsImg} alt="Nubes" />
                            <p>{weather.cloud} %</p>
                        </div>
                    </li>
                    <li className='detailsItem'>
                        <span>Índice UV</span>
                        <div className='detailsImgValue'>
                            <img src={icons.uvIndexImg} alt="Índice UV" />
                            <p>{weather.uvIndex}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}

function HourlyForecast({ hourlyForecast }) {
    return (
        <div className="hourlyForecast-container">
            <h2 className='title'>Pronóstico de hoy</h2>
            <ul className="hourlyForecast-list">
                {
                    hourlyForecast.map(hour => (
                        <li key={hour.code} className="hourlyForecast-item">
                            <div className='hourlyForecast-weatherItem'>
                                <span>{hour.date}</span>
                                <WeatherIcon width={50} height={50} weatherCode={hour.weatherCode} />
                                <span className='hourlyForecast-temperature title'>{hour.temperature}°</span>
                            </div>
                            <div className='hourlyForecast-weatherItem'>
                                <div className='hourlyForecast-description'>
                                    <p>{hour.description}</p>
                                </div>
                            </div>
                            <div className='hourlyForecast-weatherItem extraInfo'>
                                <img src={icons.rainProbabilityImg} alt="Lluvia" />
                                <span>{hour.precipitation}%</span>
                            </div>
                            <div className='hourlyForecast-weatherItem extraInfo'>
                                <img src={icons.uvIndexImg} alt="UV" />
                                <span>{hour.uvIndex}</span>
                            </div>
                            <div className='hourlyForecast-weatherItem extraInfo'>
                                <img src={icons.humidityImg} alt="Humedad" />
                                <span>{hour.humidity}%</span>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

function DaysForecast({ daysForecast }) {
    return (
        <div className="daysForecast-container">
            <h2 className='title'>Pronóstico de la semana</h2>
            <ul className='daysForecast-list'>
                {
                    daysForecast.map((day) => (
                        <li key={day.code} className='daysForecast-item'>
                            <span>{day.formattedDay}</span>
                            <span className='daysForecast-description'>{day.description}</span>
                            <WeatherIcon width={75} height={75} weatherCode={day.weatherCode} />
                            <span className='daysForecast-minMax'>{day.maxTemperature}° / {day.minTemperature}°</span>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

function ErrorNotification({ errorName, errorMessage }) {
    return (
        <div className="errorNotification">
            <div className="error-header">
                <h4>{errorName}</h4>
            </div>
            <p>{errorMessage}</p>
        </div>
    );
}


export function Main() {

    const { isFirstInput, loading } = useSearchContext();
    const { globalError } = useErrorContext();
    const { weather } = useWeatherContext();
    const { daysForecast, hourlyForecast } = useForecastContext();

    return (
        <main className='main'>
            {isFirstInput ? <FirstInput /> : (
                <>
                    {loading ? <Loading /> : globalError ? <ErrorNotification errorName={globalError.name} errorMessage={globalError.message} /> : (
                        <>
                            <CurrentWeather weather={weather} />
                            <HourlyForecast hourlyForecast={hourlyForecast} />
                            <DaysForecast daysForecast={daysForecast} />
                        </>
                    )}
                </>
            )}
        </main>
    );
}

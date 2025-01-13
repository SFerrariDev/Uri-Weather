import './WeatherIcon.css'

export function WeatherIcon({ weatherCode }) {
    return (
        <img
            src={`/assets/images/${weatherCode}.svg`}
            alt="Weather icon"
            className="weatherIcon"
        />
    );
}
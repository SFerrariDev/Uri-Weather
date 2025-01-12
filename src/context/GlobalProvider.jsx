import { SearchProvider } from './SearchContext';
import { WeatherProvider } from './WeatherContext';
import { ForecastProvider } from './ForecastContext';
import { ErrorProvider } from './ErrorContext';

export const GlobalProvider = ({ children }) => {
    return (
        <SearchProvider>
            <WeatherProvider>
                <ForecastProvider>
                    <ErrorProvider>
                        {children}
                    </ErrorProvider>
                </ForecastProvider>
            </WeatherProvider>
        </SearchProvider>
    );
};

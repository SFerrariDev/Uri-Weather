import { useState } from 'react';

export function useForecast() {
    const [daysForecast, setDaysForecast] = useState(false);
    const [hourlyForecast, setHourlyForecast] = useState(false);

    return { daysForecast, setDaysForecast, hourlyForecast, setHourlyForecast };
}
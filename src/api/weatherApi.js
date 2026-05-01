const API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY;; 
const BASE_URL = 'https://api.weatherapi.com/v1';

export const fetchWeatherByCity = async (city) => {
  try {

    const response = await fetch(
      `${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=5&lang=fr`
    );
    
    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    
    return {
      location: data.location.name,
      temperature: Math.round(data.current.temp_c),
      climat: data.current.condition.text,
      conditionCode: data.current.condition.code, 
      humidity: data.current.humidity,
      speed: data.current.wind_kph,
      pressure: data.current.pressure_mb,
      dateDay: data.location.localtime,
      forecast: data.forecast.forecastday,
    };
  } catch (error) {
    console.error("Erreur WeatherAPI:", error);
    return null;
  }
};
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { WeatherData } from './types';
import { Search, Wind, Droplets, Thermometer, Gauge } from 'lucide-react';

function App() {
  const [city, setCity] = useState('Toronto');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = '7f657f3a3edfd38165ea95a198ec3eac';
  
  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError('');
      const encodedCity = encodeURIComponent(city.trim());
      const response = await axios.get<WeatherData>(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
    } catch (err) {
      setError('City not found. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-800 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 w-full max-w-md shadow-2xl">
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="relative">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name"
              className="w-full px-4 py-3 rounded-xl bg-white/50 backdrop-blur-sm border border-white/30 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-600 hover:text-blue-600"
            >
              <Search size={20} />
            </button>
          </div>
        </form>

        {loading && (
          <div className="text-center text-gray-600">Loading...</div>
        )}

        {error && (
          <div className="text-center text-red-500 mb-4">{error}</div>
        )}

        {weather && !loading && !error && (
          <div>
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                {weather.name}
              </h1>
              <div className="flex justify-center items-center">
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].description}
                  className="w-24 h-24"
                />
                <div className="text-6xl font-bold text-gray-800">
                  {Math.round(weather.main.temp)}°C
                </div>
              </div>
              <p className="text-xl text-gray-600 capitalize">
                {weather.weather[0].description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl flex items-center gap-3">
                <Thermometer className="text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Feels Like</p>
                  <p className="text-lg font-semibold">
                    {Math.round(weather.main.feels_like)}°C
                  </p>
                </div>
              </div>

              <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl flex items-center gap-3">
                <Droplets className="text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Humidity</p>
                  <p className="text-lg font-semibold">
                    {weather.main.humidity}%
                  </p>
                </div>
              </div>

              <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl flex items-center gap-3">
                <Wind className="text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Wind Speed</p>
                  <p className="text-lg font-semibold">
                    {weather.wind.speed} m/s
                  </p>
                </div>
              </div>

              <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl flex items-center gap-3">
                <Gauge className="text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Pressure</p>
                  <p className="text-lg font-semibold">
                    {weather.main.pressure} hPa
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

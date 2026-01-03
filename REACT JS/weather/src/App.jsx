// src/Weather.js
import React, { useState } from 'react';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null); //composite data, an object, contains both strings and numbers
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    const apiKey = 'd843f74c77749be23b0d054951698e7c'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`; //template literal

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.cod === 200) {
        setWeather(data);
        setError('');
      } else {
        setError(data.message);
        setWeather(null);
      }
    } catch (err) {
      setError('Failed to fetch weather data');
      setWeather(null);
    }
  };

  return (
    <div>
      <h1>Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={fetchWeather}>Get Weather</button>
      {error && <p>{error}</p>}
      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
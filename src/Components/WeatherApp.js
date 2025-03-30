import { useState } from "react";

function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city.trim()) return;

    setLoading(true);
    setWeather(null);

    const API_KEY = "c89d7be306474604ae4210036253003";
    const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Invalid city");

      const data = await response.json();
      setWeather({
        temperature: data.current.temp_c,
        humidity: data.current.humidity,
        condition: data.current.condition.text,
        windSpeed: data.current.wind_kph,
      });
    } catch (error) {
      window.alert("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container text-center py-5">
      <div className="row justify-content-center mb-3">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="col-auto">
          <button className="btn btn-success" onClick={fetchWeather}>
            Search
          </button>
        </div>
      </div>

      {loading && <p className="text-dark fw-bold">Loading data...</p>}

      {weather && (
        <div className="row weather-cards justify-content-center">
          <div className="col-md-2 col-sm-4">
            <div className="card weather-card p-3">
              <h5>Temperature</h5>
              <p>{weather.temperature}°C</p>
            </div>
          </div>
          <div className="col-md-2 col-sm-4">
            <div className="card weather-card p-3">
              <h5>Humidity</h5>
              <p>{weather.humidity}%</p>
            </div>
          </div>
          <div className="col-md-2 col-sm-4">
            <div className="card weather-card p-3">
              <h5>Condition</h5>
              <p>{weather.condition}</p>
            </div>
          </div>
          <div className="col-md-2 col-sm-4">
            <div className="card weather-card p-3">
              <h5>Wind Speed</h5>
              <p>{weather.windSpeed} kph</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;

import "./App.css";
import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import TemperatureAndDetails from "./components/TemperatureAndDetails";
import Forecast from "./components/Forecast";
import { getFormattedWeatherData } from "./service/weatherService";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [query, setQuery] = useState({ q: "New York" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  
  useEffect(() => {
    async function fetchWeather() {
      const message = query.q ? query.q : "current location.";
      
      toast.info("Fetching weather for :" + message );
      try {
        const weatherData = await getFormattedWeatherData({ ...query, units });
        toast.success(`Successfully fetched weather for: ${weatherData.name}, ${weatherData.country}`)
        setWeather(weatherData);
        // console.log(weatherData);
      } catch (err) {
        console.log(err);
      }
    }

    fetchWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return "from-cyan-700 to-blue-700";
    const threshold = units === "metric" ? 25 : 60;
    if (weather.temp <= threshold) return "from-cyan-700 to-blue-700";

    return "from-yellow-700 to-orange-700";
  };

  return (
    <div
      className={`mx-auto max-w-screen-md mt-4 py-5 px-28 bg-gradient-to-br  h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}
    >
      <TopButtons changeCity={setQuery} />
      <Inputs setQuery={setQuery} units setUnits={setUnits} />
      {weather && (
        <div>
          <TimeAndLocation weather={weather} />
          <TemperatureAndDetails weather={weather} />
          <Forecast title="Hourly Forecast" items={weather.hourly} />
          <Forecast title="Daily Forecast" items={weather.daily} />
        </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
        newestOnTop={true}
      />
    </div>
  );
}

export default App;

import axios from "axios";
import { useState, useEffect } from "react";
import { usePosition } from "use-position";
import Weather from './components/Weather'
//npm'den hazir usePosition hook'unu kullandik (npm i use-position) ama kendin yapmak istersen https://itnext.io/creating-react-useposition-hook-for-getting-browsers-geolocation-2f27fc1d96de

const App = () => {
  const [weather, setWeather] = useState("");
  const { latitude, longitude } = usePosition();

  const getWeatherData = async (lat, lon) => {
    const key = process.env.REACT_APP_WEATHER_API_KEY;
    const lang = navigator.language.split("-")[0]
    // browser'in diline gore ayar cekme islemi

    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&lang=${lang}&units=metric`  //turkce yapmak icin lang= kismini tr yapariz.
      );
      setWeather(data);
    } catch {
      alert("Veri alinirken hata olustu.");
    }
  };

  useEffect(() => {
    latitude && longitude && getWeatherData(latitude, longitude);
  }, [latitude, longitude]);

  return (
    <div>
      <h2>Weather</h2>
        <Weather weather={weather} />
    </div>
  );
};

export default App;

import { DateTime } from "luxon";
import { toast } from 'react-toastify';


const API_KEY = "e831f5cc779d76d2e260dad5437d6028";
const base_url = "https://api.openweathermap.org/data/2.5/";

export const getWeatherData = async (infoType, searchParams) => {
  const url = new URL(base_url + infoType);
  url.search = new URLSearchParams({ ...searchParams, appId: API_KEY });

  const response = await fetch(url);
  if (!response.ok) {
    toast.error("Couldn't fetch weather.... Please re-check city name")
    throw new Error("Could not fetch data!");
  }
  const responseData = await response.json();
  return responseData;
};

const formatCurrentWeather = (data) => {
  const {
    coord: { lon, lat },
    weather,
    main: { temp, feels_like, temp_min, temp_max, humidity },
    wind: { speed },
    sys: { country, sunrise, sunset },
    name,
    dt,
  } = data;
  const { main: details, icon } = weather[0];

  return {
    country,
    details,
    dt,
    feels_like,
    humidity,
    icon,
    lat,
    lon,
    name,
    speed,
    sunrise,
    sunset,
    temp,
    temp_max,
    temp_min,
  };
};

const formatForcastWeather = (data) => {
  let { timezone, daily, hourly } = data;

  daily = daily.slice(1, 6).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "ccc"),
      temp: d.temp.day,
      icon: d.weather[0].icon,
    };
  });

  hourly = hourly.slice(1, 6).map((h) => {
    return {
      title: formatToLocalTime(h.dt, timezone, "hh:mm a"),
      temp: h.temp,
      icon: h.weather[0].icon,
    };
  });

  return { timezone, daily, hourly };
};


export const getFormattedWeatherData = async (searchParams) => {
  const formattedWeatherData = await getWeatherData(
    "weather",
    searchParams
  ).then((data) => formatCurrentWeather(data));

  const { lat, lon } = formattedWeatherData;
  const formattedForCastWeather = await getWeatherData("onecall", {
    lat,
    lon,
    exclude: "current,minutely,alerts",
    units: searchParams.units,
  }).then(formatForcastWeather);

  return {...formattedForCastWeather, ...formattedWeatherData};
};

export const formatToLocalTime = (
  secs,
  timeZone,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => {
  return DateTime.fromSeconds(secs).setZone(timeZone).toFormat(format);
};

export const getIconUrlFromCode =(code) => `http://openweathermap.org/img/wn/${code}@2x.png`;

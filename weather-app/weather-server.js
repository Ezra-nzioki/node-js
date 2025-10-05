// Import dependencies
const express = require("express");
const morgan = require("morgan");
const axios = require("axios");
const e = require("express");

const app = express();
const PORT = 3000;

// Middleware
app.use(morgan("dev")); // logs requests

// API key & base URL (OpenWeatherMap free API)
const API_KEY = "72e07f6a0d73949ea058313e40bdc6f4"; // get free from openweathermap.org
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// Route: Home
app.get("/", (req, res) => {
  res.send("🌤️ Welcome to Tiny Weather API Server");
});

// Route: Get weather for a city
app.get("/weather/:city", async (req, res) => {
  const city = req.params.city;

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
      },
    });

    const data = response.data;
    console.log(data);
    res.json({
      city: data.name,
      temperature: `${data.main.temp} °C`,
      feels_like: `${Math.round(data.main.feels_like)} °C`,
      condition: data.weather[0].description,
      humidity: `${data.main.humidity} %`,
      wind_speed: `${data.wind.speed} m/s`,
      icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    });
  } catch (error) {
    res.status(404).json({ error: "City not found or API error" });
  }
});

// Route: Get coordinates for a city
app.get("/coords/:city", async (req, res) => {
  const city = req.params.city;
  const lat=req.query.lat;
  const lon=req.query.lon;
  try {
    const response=await axios.get(BASE_URL, {
      params:{
        q:city,
        appid:API_KEY,
        lat:lat,
        lon:lon,
        units:"metric",
      },
    })
    const data=response.data;
    console.log(data);
    res.json({
      city: data.name,
      coordinates:{
        lat:data.coord.lat,
        lon:data.coord.lon
      }
    });
  } catch (error) {
    res.status(404).json({ error: "City not found or API error" });
  }
});

//route get weather forecast for coordinates
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";
app.get("/forecast/:city", async (req, res) => {
  const city = req.params.city;
  const lat=req.query.lat;
  const lon=req.query.lon;
  try {
    const response=await axios.get(FORECAST_URL, {
      params:{
        q:city,
        appid:API_KEY,
        lat:lat,
        lon:lon,
        units:"metric",
      },
      })
      const data=response.data;
    console.log(data.list);
    res.json({
      city: data.city.name,
      forecast: data.list.slice(0,5).map(e => ({
        datetime: e.dt_txt,
        temperature: `${e.main.temp} °C`,
        condition: e.weather[0].description,
      }))
    }); 
  } 
  catch (error) {
    res.status(500).json({ error: "Error fetching forecast data" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

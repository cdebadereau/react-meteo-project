import React, { useState } from "react";
import WeatherInfo from "./WeatherInfo";
import axios from "axios";
import "./Weather.css";

export default function Weather(props) {
  // const [temperature, setTemperature] = useState(null);
  const [weatherData, setWeatherData] = useState({ ready: false });
  //Au lieu de créer un state pour chaque info qui va changer, il faut créer un seul state
  const [city, setCity] = useState(props.defaultCity);
  function handleReponse(response) {
    console.log(response.data);
    //>> permet de voir ce qu'il y a dans l'objet
    setWeatherData({
      ready: true,
      city: response.data.city,
      date: new Date(response.data.time * 1000),
      description: response.data.condition.description,
      temperature: response.data.temperature.current,
      iconUrl: `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`,
      pressure: response.data.temperature.pressure,
      humidity: response.data.temperature.humidity,
      wind: response.data.wind.speed,
    });
    //setTemperature(response.data.temperature.current);
  }

  function search() {
    let apiKey = "96668c3bo8171924ab023b1atd05c04f";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    axios.get(apiUrl).then(handleReponse);
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  if (weatherData.ready) {
    return (
      <div className="Weather">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-9">
              <input
                type="search"
                placeholder="Search for a city..."
                className="form-control"
                autoFocus="on"
                onChange={handleCityChange}
              />
            </div>
            <div className="col-3">
              <input
                type="submit"
                value="Search"
                className="btn btn-primary w-100"
              />
            </div>
          </div>
        </form>
        <WeatherInfo data={weatherData} />
      </div>
    );
  } else {
    search();
    return "Loading...";
  }
}

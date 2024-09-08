import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";

export default function Weather(props) {
  // const [temperature, setTemperature] = useState(null);
  const [weatherData, setWeatherData] = useState({ ready: false });
  //Au lieu de créer un state pour chaque info qui va changer, il faut créer un seul state
  function handleReponse(response) {
    console.log(response.data);
    //>> permet de voir ce qu'il y a dans l'objet
    setWeatherData({
      ready: true,
      city: response.data.city,
      date: "Wednesday 07:00",
      description: response.data.condition.description,
      temperature: response.data.temperature.current,
      iconUrl: "https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png",
      pressure: response.data.temperature.pressure,
      humidity: response.data.temperature.humidity,
      wind: response.data.wind.speed,
    });
    //setTemperature(response.data.temperature.current);
  }

  if (weatherData.ready) {
    return (
      <div className="Weather">
        <form>
          <div className="row">
            <div className="col-9">
              <input
                type="search"
                placeholder="Search for a city..."
                className="form-control"
                autoFocus="on"
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
        <h1>{weatherData.city}</h1>
        <ul>
          <li>{weatherData.date}</li>
          <li className="text-capitalize">{weatherData.description}</li>
        </ul>
        <div className="row mt-3">
          <div className="col-6">
            <div className="clearfix">
              <img
                src={weatherData.iconUrl}
                alt={weatherData.description}
                className="float-start text-capitalize"
              />
              <div className="float-start ms-3">
                <span className="temperature">
                  {Math.round(weatherData.temperature)}
                </span>
                <span className="unit">°C</span>
              </div>
            </div>
          </div>
          <div className="col-6">
            <ul>
              <li>Pressure: {weatherData.pressure}hPa</li>
              <li>Humidity: {weatherData.humidity}%</li>
              <li>Wind: {weatherData.wind}km/h</li>
            </ul>
          </div>
        </div>
      </div>
    );
  } else {
    let apiKey = "96668c3bo8171924ab023b1atd05c04f";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${props.defaultCity}&key=${apiKey}`;
    axios.get(apiUrl).then(handleReponse);

    return "Loading...";
  }
}

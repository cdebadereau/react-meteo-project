import React from "react";
import axios from "axios";
import "./WeatherForecast.css";

export default function WeatherForecast(props) {
  function handleResponse(response) {
    console.log(response.data);
  }

  console.log(props);

  let apiKey = "96668c3bo8171924ab023b1atd05c04f";
  let city = props.city;
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(handleResponse);

  return (
    <div className="WeatherForecast">
      <div className="row">
        <div className="col">
          <div className="forecast-day">
            Wed
            <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/few-clouds-day.png" />
            <div className="forecast-temperatures">
              <span className="forecast-temperature-max">19°</span>{" "}
              <span className="forecast-temperature-min">10°</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

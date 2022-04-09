import React from "react";
import "./Result.scss";

const Result = (props) => {
  const { date, city, sunrise, sunset, temperature, pressure, wind, err } =
    props.weather;

  let content = null;

  if (!err && city) {
    const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString();
    const sunsetTime = new Date(sunset * 1000).toLocaleTimeString();
    const celsius = (temperature - 273).toFixed(2);
    content = (
      <>
        <h3>
          <em>{city}</em>
        </h3>
        <h4>{date}</h4>
        <h4> {celsius} &#176;C</h4>
        <h4>Wschód Słońca: {sunriseTime}</h4>
        <h4>Zachód Słońca: {sunsetTime}</h4>
        <h4>Siła wiatru: {wind} m/s</h4>
        <h4>Ciśnienie: {pressure} hPa</h4>
      </>
    );
  }

  return (
    <div className="result">{err ? `Nie mamy w bazie: ${city}` : content}</div>
  );
};

export default Result;

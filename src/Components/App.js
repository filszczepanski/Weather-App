import React, { Component } from "react";
import Form from "./Form";
import Result from "./Result";
import "./App.scss";
import { getByDisplayValue } from "@testing-library/react";

const APIKey = "777e2e4be0edf3e5a06363736a88bcff";

class App extends Component {
  state = {
    value: "",
    date: "",
    city: "",
    sunrise: "",
    sunset: "",
    temperature: "",
    pressure: "",
    wind: "",
    err: false,
  };

  inputChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  citySubmit = (e) => {
    e.preventDefault();
    const API = `https://thingproxy.freeboard.io/fetch/https://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&appid=${APIKey}`;

    fetch(API)
      .then((response) => {
        if (response.ok) {
          return response;
        }
        throw Error("nie ma takiego miasta");
      })
      .then((response) => response.json())
      .then((data) => {
        const time = new Date().toLocaleString();
        this.setState((state) => ({
          error: false,
          date: time,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
          temperature: data.main.temp,
          pressure: data.main.pressure,
          wind: data.wind.speed,
          city: state.value,
        }));
      })
      .catch((err) => {
        console.log(err);
        this.setState((state) => ({
          err: true,
          city: state.value,
        }));
      });

    // if (this.state.temperature >= 20) {
    //   this.setState({
    //     backgroundStyle: {
    //       backgroundImage: URL("./hot.jpg"),
    //     },
    //   });
    // } else if (this.state.temperature < 20 && this.state.temperature > 0) {
    //   this.setState({
    //     backgroundStyle: {
    //       backgroundImage: URL("./medium.jpg"),
    //     },
    //   });
    // } else if (this.state.temperature < 0) {
    //   this.setState({
    //     backgroundStyle: {
    //       backgroundImage: URL("./cold.jpg"),
    //     },
    //   });
    // }
  };

  render() {
    return (
      <div className="App">
        <Form
          value={this.state.value}
          change={this.inputChange}
          submit={this.citySubmit}
        />
        <Result weather={this.state} />
      </div>
    );
  }
}

export default App;

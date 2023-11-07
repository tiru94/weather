import React, { useState } from "react";
import axios from "axios"; // Import the axios library
import "./styles.css";

export default function App() {
  const [city, setCity] = useState(""); // Use setCity to manage the input value
  const [result, setResult] = useState("");

  const changehandler = (e) => {
    setCity(e.target.value);
  };

  const submithandler = (e) => {
    e.preventDefault();
    const apiKey = "d885aa1d783fd13a55050afeef620fcb";
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      )
      .then((response) => {
        const kelvin = response.data.main.temp;
        const celcius = kelvin - 273.15;
        setResult("Temperature at " + city + "\n" + Math.round(celcius) + "°C");
        setCity(""); // Clear the input field after the request
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <div className="card">Weather App</div>
      <form className="card" onSubmit={submithandler}>
        <input type="text" name="city" value={city} onChange={changehandler} />{" "}
        <br />
        <br />
        <input type="submit" value="Display Temp" />
      </form>
      <div>
        <h1>{result}</h1>
      </div>
    </div>
  );
}

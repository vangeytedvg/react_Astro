import React, { useState, useEffect } from "react";
import Moon from "../ephemerides/Moon";
import Sun from "../ephemerides/Sun";
import MilkyWayVideo from "../videos/milkyway.mp4";
import LocationInput from "../LocationInput";
import "./moonsun.css";

const MoonSun = () => {
  const [city, setCity] = useState("Geraardsbergen");
  const [country, setCountry] = useState("Belgium");

  const handleLocation = (country, city) => {
    // Callback function for the interval component
    setCity(city);
    setCountry(country);
  };
  return (
    <div className="background-container">
      <p>Ephemeride information</p>
      <LocationInput handleLocation={handleLocation} />
      <div className="background-container-body">
        <Moon city={city} country={country} />
        <Sun />
      </div>
      <video autoPlay loop muted>
        <source src={MilkyWayVideo} type="video/mp4" />
      </video>
    </div>
  );
};

export default MoonSun;

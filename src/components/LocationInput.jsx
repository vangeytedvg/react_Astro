import React, { useState } from "react";
import './location.css'

const LocationInput = (props) => {
  const [cityValue, setCityValue] = useState("Geraardsbergen");
  const [countryValue, setCountryValue] = useState("Belgium");

  const handleSubmit = (e, country, city) => {
      e.preventDefault()
      console.log("TEP")
      props.handleLocation(countryValue, cityValue)
  }

  return (
    <div className="location-container">
      <form onSubmit={handleSubmit}>
        <label>
          City:
          <input type="text" value={cityValue} onChange={(e) => setCityValue(e.target.value)} />
        </label>
        <label>
          Country:
          <input type="text" value={countryValue} onChange={(e) => setCountryValue(e.target.value)} />
        </label>
        <input className="btn-submit" type="submit" value="Get Data"/>
      </form>
    </div>
  );
};

export default LocationInput;

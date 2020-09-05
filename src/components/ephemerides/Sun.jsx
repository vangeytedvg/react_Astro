import React, { useState, useEffect } from "react";
import axios from "axios";
import { MoonPhase } from "../../libs/MoonPhase";
import ".././pages/moonsun.css";
import { fixToTwoDigits, fixToFourDigits } from "../../libs/Utils";

const Sun = (props) => {
  const [phases, setPhases] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getData();
    // Need to reload this page when the locations change
  }, [props]);

  const moonPhase = () => {
    let today = new Date();
    const moondata = {};
    // return MoonPhase(today.getFullYear(), today.getMonth(), today.getDay());
    return MoonPhase(today.getFullYear(), today.getMonth(), today.getDay());
  };

  // Get the moon information from the api
  const getData = () => {
    setLoading(true);
    const data = axios
      .get(
        `https://api.ipgeolocation.io/astronomy?apiKey=c13c58d9bf62443eb438327dc86d783d&location=${props.city},${props.country}`
      )
      .then((response) => {
        const resp = response.data;
        if (!resp) {
          alert("Location not found");
        }
        // Extract what we need
        const {
          sunrise,
          sunset,
          solar_noon,
          sun_altitude,
          sun_azimuth,
          sun_distance,
          day_length,
        } = resp;
        console.log(resp);
        // Set the state variables
        setPhases({
          sunrise,
          sunset,
          solar_noon,
          sun_altitude,
          sun_azimuth,
          sun_distance,
          day_length,
        });
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert(error);
        console.log(error);
      });
  };

  if (loading) {
    return <div>Loading</div>;
  } else {
    return (
      <div className="background-container-body">
        <p className="moon-title">Sun Data</p>
        <table>
          <thead>
            <tr>
              <td className="zen">Data</td>
              <td className="zen">Value</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Sunrise</td>
              <td>{phases.sunrise}</td>
            </tr>

            <tr>
              <td>Sunset</td>
              <td>{phases.sunset}</td>
            </tr>

            <tr>
              <td>Solar noon</td>
              <td>{phases.solar_noon}</td>
            </tr>

            <tr>
              <td>Day length</td>
              <td>{phases.day_length}</td>
            </tr>

            <tr>
              <td>Altitude</td>
              <td>{fixToTwoDigits(phases.sun_altitude)}°</td>
            </tr>
            <tr>
              <td>Azimuth</td>
              <td>{fixToTwoDigits(phases.sun_azimuth)}°</td>
            </tr>
            <tr>
              <td>Distance to earth</td>
              <td>{fixToFourDigits(phases.sun_distance)}&nbsp;Km</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
};

export default Sun;

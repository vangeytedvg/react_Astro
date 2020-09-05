import React, { useState, useEffect } from "react";
import axios from "axios";
import { MoonPhase } from "../../libs/MoonPhase";
import ".././pages/moonsun.css";
import { fixToTwoDigits, fixToFourDigits } from "../../libs/Utils";

const Moon = (props) => {
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
          moon_altitude,
          moon_azimuth,
          moonset,
          moonrise,
          moon_distance,
          moon_parallactic_angle,
        } = resp;
        console.log(resp);
        // Set the state variables
        setPhases({
          moonset,
          moonrise,
          moon_altitude,
          moon_azimuth,
          moon_distance,
          moon_parallactic_angle,
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
        <p className="moon-title">Moon Data</p>
        <table>
          <thead>
            <tr>
              <td className="zen">Data</td>
              <td className="zen">Value</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Moon rise</td>
              <td>{phases.moonrise}</td>
            </tr>
            <tr>
              <td>Moon set</td>
              <td>{phases.moonset}</td>
            </tr>
            <tr>
              <td>Altitude</td>
              <td>{fixToTwoDigits(phases.moon_altitude)}°</td>
            </tr>
            <tr>
              <td>Azimuth</td>
              <td>{fixToTwoDigits(phases.moon_azimuth)}°</td>
            </tr>
            <tr>
              <td>Distance to earth</td>
              <td>{fixToFourDigits(phases.moon_distance)}&nbsp;Km</td>
            </tr>
            <tr>
              <td>Parallatic angle</td>
              <td>{fixToTwoDigits(phases.moon_parallactic_angle)}°</td>
            </tr>
            <tr>
              <td>Phase</td>
              <td>{moonPhase()}</td>
            </tr>
            <tr>
              <td>Looks like</td>
              <td>
                <img
                  className="moon-pic"
                  src={require("../images/" + moonPhase() + ".png")}
                  alt="Moonphase"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
};

export default Moon;

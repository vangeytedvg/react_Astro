/*
  Show information about the sun and moon.
  Notice that I did not import images for the moon phase,
  but uses 'require' to do this.
  Author : DVG
*/
import React, { useState, useEffect } from "react";
import backvideo from "../videos/earthDataView.mp4";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { MoonPhase } from "../../libs/MoonPhase";
// import Interval from "../Interval";
import LocationInput from '../LocationInput'

let INTERVAL = 1000 * 10;

const New = () => {
  const [phases, setPhases] = useState({});
  const [loading, setLoading] = useState(true);
  const [intervalSecs, setInterval] = useState(1000); // Seconds interval by default
  const [city, setCity] = useState('Geraardsbergen')
  const [country, setCountry] = useState('Belgium')

  const moonPhase = () => {
    let today = new Date();
    const moondata = {};
    // return MoonPhase(today.getFullYear(), today.getMonth(), today.getDay());
    return MoonPhase(today.getFullYear(), today.getMonth(), today.getDay());
  };

  const fixToTwoDigits = (data) => {
    // This function gets called when loading the page, so
    // we need to see if we have data.  Otherwise the page crashes with undefined!
    // The function is used to take in large numbers and round them to two digits after the comma
    if (!data) return;
    let convert = data;
    return convert.toFixed(2);
  };

  const getData = () => {
    setLoading(true)
    const data = axios
      .get(
        `https://api.ipgeolocation.io/astronomy?apiKey=c13c58d9bf62443eb438327dc86d783d&location=${city},${country}`
      )
      .then((response) => {
        setLoading(false);
        const resp = response.data;
        if (!resp) {
          console.log("Location not found")
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
          moon_altitude,
          moon_azimuth,
          moonset,
          moonrise,
          moon_distance,
          moon_parallactic_angle,
        } = resp;

        setPhases({
          sunrise,
          sunset,
          solar_noon,
          sun_altitude,
          sun_azimuth,
          sun_distance,
          moonset,
          moonrise,
          day_length,
          moon_altitude,
          moon_azimuth,
          moon_distance,
          moon_parallactic_angle,
        });
        console.log(resp);
      })
      .catch((error) => {
        setLoading(false)
        alert(error)
        console.log(error);
      })
  };

  useEffect(() => {
    // On startup, we set an interval for refreshing the
    // data
    // const interval = setInterval(() => {
      getData();
    // }, 1000);
    // Load the astronomical data
    // On unmounting, we clear the interval
    // return () => clearInterval(interval);
  }, [city]);

  const handleLocation = (country, city) => {
    // Callback function for the interval component
    setCity(city)
    setCountry(country)
    getData()
  }

  return (
    <div className="hero-container">
      {/* The Interval component lets the user select and interval,
          To intercept what interval was selected use a callback function,
          in this case handleIntervalChange.  
      */}
      {/* <Interval handleIntervalChange={handleIntervalChange} /> */}
      <p>Ephemeride information</p>
      {/* <div className="refresher">
        Page reloads every {intervalSecs} seconds &nbsp;
        {loading ? <div>(reloading...)</div> : null}
      </div> */}
      <LocationInput handleLocation={handleLocation}/>
      <Container>
        <Row>
          <Col md={4}>
            <div className="sun-info-header">Sun Data</div>
            <div className="sun-info">
              Sunrise :&nbsp;<span>{phases.sunrise}</span>
            </div>
            <div className="sun-info">
              Sunset :&nbsp;<span>{phases.sunset}</span>
            </div>
            <div className="sun-info">
              Solar noon :&nbsp;<span>{phases.solar_noon}</span>
            </div>
            <div className="sun-info">
              Sun altitude :&nbsp;
              <span>{fixToTwoDigits(phases.sun_altitude)}°</span>
            </div>
            <div className="sun-info">
              Sun azimuth :&nbsp;
              <span>{fixToTwoDigits(phases.sun_azimuth)}°</span>
            </div>
            <div className="sun-info">
              Sun distance :&nbsp;
              <span>{fixToTwoDigits(phases.sun_distance)}km</span>
            </div>
            <div className="sun-info">
              Day length :&nbsp;<span>{phases.day_length}</span>
            </div>
          </Col>
          <Col>
            <div className="sun-info-header">Moon Data</div>
            <div className="sun-info">
              Altitude :&nbsp;
              <span>{fixToTwoDigits(phases.moon_altitude)}°</span>
            </div>
            <div className="sun-info">
              Azimuth :&nbsp;<span>{fixToTwoDigits(phases.moon_azimuth)}°</span>
            </div>
            <div className="sun-info">
              Parlactic Ange :&nbsp;
              <span>{fixToTwoDigits(phases.moon_parallactic_angle)}°</span>
            </div>
            <div className="sun-info">
              Distance :&nbsp;
              <span>{fixToTwoDigits(phases.moon_distance)}km</span>
            </div>
            <div className="sun-info">
              Moon Rise :&nbsp; <span>{phases.moonrise}</span>
            </div>
            <div className="sun-info">
              Moon Set :&nbsp;<span>{phases.moonset}</span>
            </div>
            <div className="sun-info">Moon phase : {moonPhase()}</div>
            <div className="sun-info">
              <img
                className="moon-pic"
                src={require("../images/" + moonPhase() + ".png")}
                alt="Moonphase"
              />
            </div>
          </Col>
        </Row>
      </Container>
      <video autoPlay loop muted>
        <source src={backvideo} type="video/mp4" />
      </video>
    </div>
  );
};

export default New;

import React from 'react'
import backvideo from "../videos/flyingText.mp4";
import './about.css'


const About = () => {
    return (
        <div className="hero-container">
        <p>About</p>
        <h2 className="written-by">Written and designed by</h2>
        <h1 className="author">Danny Van Geyte</h1>
        <video autoPlay loop muted>
          <source src={backvideo} type="video/mp4" />
        </video>
      </div>
    )
}

export default About

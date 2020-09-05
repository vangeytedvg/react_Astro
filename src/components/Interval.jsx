import React, { useState } from "react";

const Interval = (props) => {
  const [selectedValue, setSelectedValue] = useState(0);

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
    props.handleIntervalChange(e.target.value)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitiing");
  };

  return (
    <div className="interval-control">
        <label>
          Select page refresh interval
          <select value={selectedValue} onChange={handleChange}>
            <option value="0">No refresh</option>
            <option value="1000">1 sec</option>
            <option value="5000">5 secs</option>
            <option value="10000">10 secs</option>
            <option value="60000">1 Minute</option>
          </select>
        </label>
    </div>
  );
};

export default Interval;

// src/components/ThemeSwitch.jsx
import React, { useEffect, useState } from "react";
import "./ThemeSwitch.css";
import cloud1 from "../assets/cloud_1.svg";
import cloud2 from "../assets/cloud_2.svg";
import cloud3 from "../assets/cloud_3.svg";
import cloud4 from "../assets/cloud_4.svg";
import stars from "../assets/stars.svg";

const ThemeSwitch = () => {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  const toggleTheme = () => setDark((prev) => !prev);

  return (
    <label className="switch">
      <input type="checkbox" checked={dark} onChange={toggleTheme} />
      <div className="sunmoon">
        <div className="darkside"></div>
      </div>
      <div className="border"></div>
      <div className="clouds">
        <img src={cloud1} className="cloud cloud-1" alt="cloud1" />
        <img src={cloud2} className="cloud cloud-2" alt="cloud2" />
        <img src={cloud3} className="cloud cloud-3" alt="cloud3" />
        <img src={cloud4} className="cloud cloud-4" alt="cloud4" />
        <img src={stars} className="stars" alt="stars" />
      </div>
    </label>
  );
};

export default ThemeSwitch;

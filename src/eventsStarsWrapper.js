import React from "react";
import { useState } from "react";
import Events from "./events";
import Stars from "./stars";

/*
  Wrapper to display the events page along with the stars background

*/


function EventsPage() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("isDarkMode") === "true";
  });

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("isDarkMode", !isDarkMode); // save the opposite of the current value
    console.log("Dark mode toggled");
  };

  return (
    <div>
      <div className="weather">
        <Events isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      </div>

      {isDarkMode ? (
        <div className="stars">
          <Stars />
        </div>
      ) : (
        <div
          className="lightMode"
          style={{
            background:
              "linear-gradient(142deg, #5A40F9 22.71%, #9F91FB 40.7%, #A99CFC 57.29%, #573CF9 78.94%)",
            width: "100%",
            height: "100vh",
          }}
        ></div>
      )}
    </div>
  );
}

export default EventsPage;

import React, { useState } from "react";
import "./forecast_style.css";

const Forecast = ({ className }) => {
  // Initialize property1 as "default"
  const [property1, setProperty1] = useState("default");

  // Function to handle the click on the Weekly symbol
  const handleWeeklyClick = () => {
    // Toggle between "default" and "variant-2"
    setProperty1("variant-2");
  };

  const handleHourlyClick = () => {
    setProperty1("default");
  };

  return (
    <div className={`forecast ${className}`}>
      <div className={`text-wrapper ${property1}`} onClick={handleHourlyClick}>
        Hourly
      </div>

      <div
        className={`div property-1-${property1}`}
        onClick={handleWeeklyClick} // Handle the click
      >
        Weekly
      </div>

      <img
        className="line"
        alt="Line"
        src={
          property1 === "variant-2"
            ? "https://c.animaapp.com/HlVE0F6Z/img/line-12-3.svg"
            : "https://c.animaapp.com/HlVE0F6Z/img/line-12-2.svg"
        }
      />

      <div className={`hourly property-1-0-${property1}`}>
        <div className="group">
          <div className="overlap-group">
            {property1 === "default" && (
              <img
                className="moon-cloud-mid-rain"
                alt="Moon cloud mid rain"
                src="https://c.animaapp.com/HlVE0F6Z/img/moon-cloud-mid-rain-15@2x.png"
              />
            )}

            <div className="element-AM">
              {property1 === "default" && <>12 AM</>}
              {property1 === "variant-2" && <>MON</>}
            </div>

            <div className="text-wrapper-2">19°</div>

            {property1 === "variant-2" && (
              <img
                className="emoji-slightly"
                alt="Emoji slightly"
                src="https://c.animaapp.com/HlVE0F6Z/img/---emoji--slightly-smiling-face-emoji--5@2x.png"
              />
            )}
          </div>
        </div>

        <div className="group">
          <div className="overlap-group">
            {property1 === "variant-2" && (
              <>
                <div className="text-wrapper-3">TUE</div>
                <div className="text-wrapper-2">17°</div>
              </>
            )}

            <img
              className="emoji-neutral-face"
              alt="Emoji neutral face"
              src={
                property1 === "default"
                  ? "https://c.animaapp.com/HlVE0F6Z/img/moon-cloud-mid-rain-15@2x.png"
                  : "https://c.animaapp.com/HlVE0F6Z/img/---emoji--neutral-face-emoji--3@2x.png"
              }
            />

            {property1 === "default" && (
              <>
                <div className="text-wrapper-4">1 AM</div>
                <div className="text-wrapper-2">12°</div>
              </>
            )}
          </div>
        </div>

        <div className="group">
          <div className="overlap-group">
            {property1 === "variant-2" && (
              <>
                <div className="text-wrapper-5">WED</div>
                <div className="text-wrapper-6">20°</div>
              </>
            )}

            <img
              className="img"
              alt="Emoji slightly"
              src={
                property1 === "default"
                  ? "https://c.animaapp.com/HlVE0F6Z/img/moon-cloud-mid-rain-15@2x.png"
                  : "https://c.animaapp.com/HlVE0F6Z/img/---emoji--slightly-smiling-face-emoji--5@2x.png"
              }
            />

            {property1 === "default" && (
              <>
                <div className="text-wrapper-7">2 AM</div>
                <div className="text-wrapper-6">16°</div>
              </>
            )}
          </div>
        </div>

        <div className="group">
          <div className="overlap-group">
            {property1 === "variant-2" && (
              <>
                <div className="text-wrapper-8">THUR</div>
                <div className="text-wrapper-2">15°</div>
              </>
            )}

            <img
              className="emoji-slightly-2"
              alt="Emoji slightly"
              src={
                property1 === "default"
                  ? "https://c.animaapp.com/HlVE0F6Z/img/moon-cloud-mid-rain-15@2x.png"
                  : "https://c.animaapp.com/HlVE0F6Z/img/---emoji--slightly-frowning-face-emoji--3@2x.png"
              }
            />

            {property1 === "default" && (
              <>
                <div className="text-wrapper-9">3 AM</div>
                <div className="text-wrapper-2">19°</div>
              </>
            )}
          </div>
        </div>

        <div className="group">
          <div className="overlap-group">
            {property1 === "variant-2" && (
              <>
                <div className="text-wrapper-10">FRI</div>
                <div className="text-wrapper-2">12°</div>
              </>
            )}

            <img
              className="emoji-neutral-face-2"
              alt="Emoji neutral face"
              src={
                property1 === "default"
                  ? "https://c.animaapp.com/HlVE0F6Z/img/moon-cloud-mid-rain-15@2x.png"
                  : "https://c.animaapp.com/HlVE0F6Z/img/---emoji--neutral-face-emoji--3@2x.png"
              }
            />

            {property1 === "default" && (
              <>
                <div className="text-wrapper-7">4 AM</div>
                <div className="text-wrapper-2">18°</div>
              </>
            )}
          </div>
        </div>

        <div className="group">
          <div className="overlap-group">
            {property1 === "variant-2" && (
              <>
                <div className="text-wrapper-11">SAT</div>
                <div className="text-wrapper-2">19°</div>
              </>
            )}

            <img
              className="emoji-slightly-3"
              alt="Emoji slightly"
              src={
                property1 === "default"
                  ? "https://c.animaapp.com/HlVE0F6Z/img/moon-cloud-mid-rain-15@2x.png"
                  : "https://c.animaapp.com/HlVE0F6Z/img/---emoji--slightly-smiling-face-emoji--5@2x.png"
              }
            />

            {property1 === "default" && (
              <>
                <div className="text-wrapper-8">12 AM</div>
                <div className="text-wrapper-2">19°</div>
              </>
            )}
          </div>
        </div>

        <div className="group">
          <div className="overlap-group">
            {property1 === "default" && (
              <img
                className="moon-cloud-mid-rain-2"
                alt="Moon cloud mid rain"
                src="https://c.animaapp.com/HlVE0F6Z/img/moon-cloud-mid-rain-15@2x.png"
              />
            )}

            <div className="element-AM-2">
              {property1 === "default" && <>12 AM</>}
              {property1 === "variant-2" && <>SUN</>}
            </div>

            <div className="text-wrapper-6">19°</div>

            {property1 === "variant-2" && (
              <img
                className="emoji-slightly-4"
                alt="Emoji slightly"
                src="https://c.animaapp.com/HlVE0F6Z/img/---emoji--slightly-frowning-face-emoji--3@2x.png"
              />
            )}
          </div>
        </div>

        {property1 === "default" && (
          <div className="group">
            <div className="overlap-group">
              <img
                className="moon-cloud-mid-rain"
                alt="Moon cloud mid rain"
                src="https://c.animaapp.com/HlVE0F6Z/img/moon-cloud-mid-rain-15@2x.png"
              />

              <div className="text-wrapper-8">12 AM</div>

              <div className="text-wrapper-2">19°</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Forecast;

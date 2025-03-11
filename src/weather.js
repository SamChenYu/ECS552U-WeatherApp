import React, { useState } from 'react'
import axios from 'axios'
import './weather.css'
import SmallWidget from './smallwidget'

function App() {

  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const API_KEY = process.env.REACT_APP_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;


  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
        .catch((error) => {
          console.log(error)
          alert("Location not found");
        })
      setLocation('')
    }
  }

  return (
    <div className="App">

      <div className="container">

        <div className="search">
          <input
            value={location}
            onChange={event => setLocation(event.target.value)}
            onKeyPress={searchLocation}
            placeholder='Search Location'
            type="text" />
        </div>


        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {/* Ternary operator to return null if temp is not there */}
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        <div className="humidity/light">
          <SmallWidget
            title="HUMIDITY"
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 22C13.8565 22 15.637 21.2625 16.9497 19.9497C18.2625 18.637 19 16.8565 19 15C19 13 18 11.1 16 9.5C14 7.9 12.5 5.5 12 3C11.5 5.5 10 7.9 8 9.5C6 11.1 5 13 5 15C5 16.8565 5.7375 18.637 7.05025 19.9497C8.36301 21.2625 10.1435 22 12 22Z" stroke="white" stroke-opacity="0.6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>}
            level="90%"
          />
          <SmallWidget
            title="LIGHT POLLUTION"
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="26" viewBox="0 0 18 26" fill="none">
              <path d="M13 15.2222C13.25 14.1111 13.875 13.3334 14.875 12.4445C16.125 11.4445 16.75 10 16.75 8.55558C16.75 6.78747 15.9598 5.09178 14.5533 3.84154C13.1468 2.59129 11.2391 1.88892 9.25 1.88892C7.26088 1.88892 5.35322 2.59129 3.9467 3.84154C2.54018 5.09178 1.75 6.78747 1.75 8.55558C1.75 9.66669 2 11 3.625 12.4445C4.5 13.2222 5.25 14.1111 5.5 15.2222M5.5 19.6667H13M6.75 24.1111H11.75" stroke="white" stroke-opacity="0.6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>}
            level="High"
          />
        </div>




        {data.name !== undefined &&


          <div className="bottom">
            <div className="feels">
              <p>Feels Like</p>
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°C</p> : null}
            </div>
            <div className="humidity">
              <p>Humidity</p>
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
            </div>
            <div className="wind">
              <p>Wind Speed</p>
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} km/h</p> : null}
            </div>
          </div>


        }



      </div>
    </div>
  );
}

export default App;
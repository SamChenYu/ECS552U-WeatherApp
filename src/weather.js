import React, { useState } from 'react'
import axios from 'axios'
import './weather.css'

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
        <div id="menu_bar">
          <svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M39.4167 12.5417V8.95833H3.58333V12.5417H39.4167ZM39.4167 19.7083V23.2917H3.58333V19.7083H39.4167ZM39.4167 30.4583V34.0417H3.58333V30.4583H39.4167Z" fill="white" fill-opacity="0.6" />
          </svg>
        </div>


        <div className="search">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.3833 12.7666C7.76953 12.7666 9.04785 12.3184 10.0938 11.5713L14.0283 15.5059C14.2109 15.6885 14.4517 15.7798 14.709 15.7798C15.2485 15.7798 15.6304 15.3647 15.6304 14.8335C15.6304 14.5845 15.5474 14.3438 15.3647 14.1694L11.4551 10.2515C12.2769 9.17236 12.7666 7.83594 12.7666 6.3833C12.7666 2.87207 9.89453 0 6.3833 0C2.88037 0 0 2.86377 0 6.3833C0 9.89453 2.87207 12.7666 6.3833 12.7666ZM6.3833 11.3887C3.64404 11.3887 1.37793 9.12256 1.37793 6.3833C1.37793 3.64404 3.64404 1.37793 6.3833 1.37793C9.12256 1.37793 11.3887 3.64404 11.3887 6.3833C11.3887 9.12256 9.12256 11.3887 6.3833 11.3887Z" fill="white" fill-opacity="0.98" />
          </svg>

          <input
            value={location}
            onChange={event => setLocation(event.target.value)}
            onKeyPress={searchLocation}
            placeholder='Enter Location'
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
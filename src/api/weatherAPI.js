import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

function makeWeatherAPIURL(location) {
    return `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;
}

export default async function makeWeatherAPICall(location) {
    try {
        const response = await axios.get(makeWeatherAPIURL(location))
        console.log("weather API response", response)
        return response.data;
    } catch (error) {
        console.error("weather API error", error)
        return null
    }
}
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY_HOURLY_WEEKLY;

function makeForecastAPIURL(location) {
    return `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=7&aqi=no&alerts=no`;
}

export default async function makeForecastAPICall(location) {
    try {
        const response = await axios.get(makeForecastAPIURL(location))
        console.log("forecast API response", response)
        return response.data;
    } catch (error) {
        console.error("forecast API error", error)
        return null
    }
}
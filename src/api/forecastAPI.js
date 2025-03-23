import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY_HOURLY_WEEKLY;

function makeForecastAPIURL(location, numberOfDays = 7) {
    return `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=${numberOfDays}&aqi=no&alerts=no`;
}

export default async function makeForecastAPICall(location, numberOfDays = 7) {
    try {
        const response = await axios.get(makeForecastAPIURL(location, numberOfDays))
        console.log("forecast API response", response)
        return response.data;
    } catch (error) {
        console.error("forecast API error", error)
        return null
    }
}
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY_HOURLY_WEEKLY;

/**
 *  Returns the api request url using the api key, location and number of days
 * */
function makeForecastAPIURL(location, numberOfDays = 7) {
    return `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=${numberOfDays}&aqi=no&alerts=no`;
}

/**
 * Makes the api call to the forecast api for a given location (word)
 * and how many days to forecast. The default is 7 days but the api could
 * return less (on the free tier). The api also returns the hourly forecast
 * for the current day by default.
 */
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
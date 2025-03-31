import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY_HOURLY_WEEKLY;

function makeIPLookupAPIURL(location, numberOfDays = 7) {
    return `http://api.weatherapi.com/v1/ip.json?key=${API_KEY}&q=auto:ip`;
}

export default async function makeIPLookupAPICall(location, numberOfDays = 7) {
    try {
        const response = await axios.get(makeIPLookupAPIURL(location, numberOfDays))
        console.log("ip lookup API response", response)
        return response.data;
    } catch (error) {
        console.error("ip lookup API error", error)
        return null
    }
}
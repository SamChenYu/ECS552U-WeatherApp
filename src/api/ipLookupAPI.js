import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY_HOURLY_WEEKLY;

/**
 * Returns the ip lookup api request url using the api key
 */
function makeIPLookupAPIURL() {
    return `http://api.weatherapi.com/v1/ip.json?key=${API_KEY}&q=auto:ip`;
}

/**
 * Makes the api call to the ip lookup api. The ip address is automatically
 * detected by the api so we do not need to pass it as an argument. This is
 * used to automatically get the default location of the user.
 */
export default async function makeIPLookupAPICall() {
    try {
        const response = await axios.get(makeIPLookupAPIURL())
        console.log("ip lookup API response", response)
        return response.data;
    } catch (error) {
        console.error("ip lookup API error", error)
        return null
    }
}
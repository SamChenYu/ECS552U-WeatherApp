import axios from "axios";

const EVENTS_APP_ID = process.env.REACT_APP_EVENTS_API_ID;
const EVENTS_APP_SECRET = process.env.REACT_APP_EVENTS_API_SECRET;

const API_URL = `https://api.astronomyapi.com/api/v2/bodies/events/`
const BODIES = ["Sun", "Moon"]
const MAX_QUERY_RANGE_DAYS = 366;

function getEventAPIAuthString() {
    // Creates auth string that api expects
    return btoa(`${EVENTS_APP_ID}:${EVENTS_APP_SECRET}`)
}

function getEventAPIUrls() {
    // Dynamically the url from the BODIES array, makes it easy to add more bodies as the api supports
    return BODIES.map(body => API_URL + body)
}

function getQueryRange() {
    // The api has a maximum query range of 366 days, so set the range from today to 366 days from today
    // The api also requires the time, set this to be in one hour
    const currentDate = new Date(Date.now());

    const oneHourFromNow = new Date();
    oneHourFromNow.setHours(currentDate.getHours() + 1);

    const maxQueryRange = new Date();
    maxQueryRange.setDate(currentDate.getDate() + MAX_QUERY_RANGE_DAYS);

    return {
        from_date: currentDate.toISOString().split("T")[0], // get the date as the api expects
        to_date: maxQueryRange.toISOString().split("T")[0], // get the date as the api expects
        time: oneHourFromNow.toTimeString().split(" ")[0], // get the time as the api expects
    }
}

/**
 * Makes the api call to the events api for the given latitude and longitude
 * This returns information about the upcoming astronomical events for the location
 */
export default async function makeEventsAPICall(longitude, latitude) {
    try {
        const queryRanges = getQueryRange();
        // Make the api calls for each body
        const responses = await Promise.all(
            getEventAPIUrls().map((url) =>
                axios
                    .get(url, {
                        params: {
                            latitude: latitude,
                            longitude: longitude,
                            elevation: 0,
                            from_date: queryRanges.from_date,
                            to_date: queryRanges.to_date,
                            time: queryRanges.time,
                        },
                        headers: {
                            Authorization: `Basic ${getEventAPIAuthString()}`,
                        },
                    })
            )
        );
        console.log("events API response", responses)
        return responses.map(responses => responses.data);
    } catch (error) {
        console.error("events API error", error)
        return null
    }
}
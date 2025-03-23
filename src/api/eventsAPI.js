import axios from "axios";

const EVENTS_APP_ID = process.env.REACT_APP_EVENTS_API_ID;
const EVENTS_APP_SECRET = process.env.REACT_APP_EVENTS_API_SECRET;

const API_URL = `https://api.astronomyapi.com/api/v2/bodies/events/`
const BODIES = ["Sun", "Moon"]
const MAX_QUERY_RANGE_DAYS = 366;

function getEventAPIAuthString() {
    return btoa(`${EVENTS_APP_ID}:${EVENTS_APP_SECRET}`)
}

function getEventAPIUrls() {
    return BODIES.map(body => API_URL + body)
}

function getQueryRange() {
    const currentDate = new Date(Date.now());

    const oneHourFromNow = new Date();
    oneHourFromNow.setHours(currentDate.getHours() + 1);

    const maxQueryRange = new Date();
    maxQueryRange.setDate(currentDate.getDate() + MAX_QUERY_RANGE_DAYS);

    return {
        from_date: currentDate.toISOString().split("T")[0],
        to_date: maxQueryRange.toISOString().split("T")[0],
        time: oneHourFromNow.toTimeString().split(" ")[0],
    }
}

export default async function makeEventsAPICall(longitude, latitude) {
    try {
        const queryRanges = getQueryRange();
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
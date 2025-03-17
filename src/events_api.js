const EVENTS_APP_ID = process.env.REACT_APP_EVENTS_API_ID;
const EVENTS_APP_SECRET = process.env.REACT_APP_EVENTS_API_SECRET;

export function getEventAPIAuthString() {
    return btoa(`${EVENTS_APP_ID}:${EVENTS_APP_SECRET}`)
}

const eventsURL = `https://api.astronomyapi.com/api/v2/bodies/events/`
const bodies = ["Sun", "Moon"]

export function getEventAPIUrls() {
    return bodies.map(body => eventsURL + body)
}


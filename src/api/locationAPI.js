const API_ENABLED = process.env.REACT_APP_GOOGLE_MAP_API_ENABLED === "true";

/**
 * Creates fake data for the location API so that we can test the app
 * without using the real api as there are limited credits.
 */
function generatePlaceholderLocations() {
    return [1, 2, 3].map((el) => {
        return {
            location: {
                lat: () => { return el },
                lng: () => { return el },
            },
            displayName: `Development Location ${el}`,
        };
    })
}

/**
 * Makes the api call to the location api for a given location.
 * This is used to make stargazing spot recommendations in the 
 * area the user has searched.
 */
export default async function makeLocationAPICall(location) {
    if (!API_ENABLED) {
        // The api environment variable is not set (during development)
        // so don't make the real api call and use the placeholder data
        console.warn("Google API disabled during development");
        return generatePlaceholderLocations();
    }

    if (!window.google) {
        // The google api has not loaded so we can't make the request
        console.error("location API error", "not loaded")
        return null;
    }

    // The recommendation request is made by searching "Viewpoints in <location>"
    // for the specified location.
    const request = {
        textQuery: `Viewpoints in ${location}`,
        fields: ["displayName", "location"],
        language: "en-GB",
        maxResultCount: 3,
    };

    // Make the api call to the google maps api
    const { Place } = await window.google.maps.importLibrary("places");
    const { places } = await Place.searchByText(request);

    if (places) {
        console.log("location API response", places)
        return places;
    } else {
        return null;
    }
}
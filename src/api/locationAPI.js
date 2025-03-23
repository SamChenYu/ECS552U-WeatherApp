const API_KEY = process.env.REACT_APP_API_KEY_HOURLY_WEEKLY;
const API_ENABLED = process.env.REACT_APP_GOOGLE_MAP_API_ENABLED === "true";


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

export default async function makeLocationAPICall(location) {
    if (!window.google) {
        console.error("location API error", "not loaded")
        return null;
    }

    if (!API_ENABLED) {
        console.warn("Google API disabled during development");
        return generatePlaceholderLocations();
    }

    const request = {
        textQuery: `Viewpoints in ${location}`,
        fields: ["displayName", "location"],
        language: "en-GB",
        maxResultCount: 3,
    };

    const { Place } = await window.google.maps.importLibrary("places");
    const { places } = await Place.searchByText(request);

    if (places) {
        console.log("location API response", places)
        return places;
    } else {
        return null;
    }
}
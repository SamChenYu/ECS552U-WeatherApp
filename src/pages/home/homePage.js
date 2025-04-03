import { useState, useEffect } from 'react';
import Stars from "../../stars";
import LocationSidebar from '../../components/locationSidebar/locationSidebar';
import { useNavigate } from 'react-router-dom';


const MOBILE_THRESHOLD = 1200; // Define the threshold for mobile view

export default function HomePage() {
    const navigate = useNavigate();
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem("isDarkMode") === "true";
    }); // get the dark mode value from local storag 
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [isMobile, setIsMobile] = useState(screenWidth < MOBILE_THRESHOLD);

    function handleResize() {
        setIsMobile(window.innerWidth < MOBILE_THRESHOLD);
        setScreenWidth(window.innerWidth);
    }

    useEffect(() => {
        // Add event listener to handle screen resize when the page loads
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, []);

    useEffect(() => {
        // If the screen is resized to desktop from mobile, go to the weather page
        // as there is no home page on desktop. The location information will be in the
        // sidebar
        if (!isMobile) {
            navigate("/weather");
        }
    }, [isMobile])

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        localStorage.setItem("isDarkMode", !isDarkMode); // save the opposite of the current value
        console.log("Dark mode toggled");
    }

    return (
        <div>
            <div className="weather">
                <LocationSidebar isOpen={true} isMobile={true} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
            </div>

            {isDarkMode ? (
                <div className="stars">
                    <Stars />
                </div>
            ) : (
                <div
                    className="lightMode"
                    style={{
                        background:
                            'linear-gradient(142deg, #5A40F9 22.71%, #9F91FB 40.7%, #A99CFC 57.29%, #573CF9 78.94%)',
                        width: '100%',
                        height: '100vh'
                    }}
                ></div>
            )}
        </div>
    );
}
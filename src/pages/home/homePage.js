import { useState, useEffect } from 'react';
import Stars from "../../stars";
import LocationSidebar from '../../components/locationSidebar/locationSidebar';
import { useNavigate } from 'react-router-dom';

const MOBILE_THRESHOLD = 1000

export default function HomePage() {
    const navigate = useNavigate();
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem("isDarkMode") === "true";
    });
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [isMobile, setIsMobile] = useState(screenWidth < MOBILE_THRESHOLD);

    function handleResize() {
        setIsMobile(window.innerWidth < MOBILE_THRESHOLD);
        setScreenWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, []);

    useEffect(() => {
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
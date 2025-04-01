import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loading from './loading';
import WeatherPage from './weatherStarsWrapper';
import EventsPage from './eventsStarsWrapper';
import HomePage from './pages/home/homePage';
import SingleEventPage from "./singleEventWrapper";
import CloudCoveragePage from "./cloudCoverageWrapper";

const AppRoutes = () => {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Loading />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/weather" element={<WeatherPage />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/singleEvent" element={<SingleEventPage />} />
                <Route path="/cloudCoverage" element={<CloudCoveragePage />} />
            </Routes>
        </Router>
    );


}

export default AppRoutes;
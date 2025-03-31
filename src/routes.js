import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loading from './loading';
import WeatherPage from './weatherStarsWrapper';
import EventsPage from './eventsStarsWrapper';
import RecommendationsPage from './recommendationsStarsWrapper';
import HomePage from './pages/home/homePage';
import SingleEventPage from "./singleEventWrapper";

const AppRoutes = () => {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Loading />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/weather" element={<WeatherPage />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/recommendations" element={<RecommendationsPage />} />
                <Route path="/singleEvent" element={<SingleEventPage />} />
            </Routes>
        </Router>
    );


}

export default AppRoutes;
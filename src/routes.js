import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loading from "./loading";
import WeatherPage from "./weatherStarsWrapper";
import EventsPage from "./eventsStarsWrapper";
import RecommendationsPage from "./recommendationsStarsWrapper";
import LocationPage from "./pages/locations/locationsPage";
import EventsPage from './eventsStarsWrapper';

import SingleEventPage from "./singleEventWrapper";
import HomePage from './pages/home/homePage';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Loading />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/locations" element={<LocationPage />} />
        <Route path="/weather" element={<WeatherPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/recommendations" element={<RecommendationsPage />} />
        <Route path="/singleEvent" element={<SingleEventPage />} />
      </Routes>
    </Router>
  );
};



export default AppRoutes;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Loading from './loading';
import WeatherPage from './weatherStarsWrapper';
import EventsWidget from './events';

const AppRoutes = () => {

    return (
        <Router>
            <Routes>
                <Route path = "/" element = {<Loading />} />
                <Route path = "/weather" element = {<WeatherPage />} />
                <Route path = "/events" element = {<EventsWidget />} />
            </Routes>
        </Router>
    );


}

export default AppRoutes;
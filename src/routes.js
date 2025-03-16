import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Loading from './loading';
import WeatherPage from './weatherStarsWrapper';

const AppRoutes = () => {

    return (
        <Router>
            <Routes>
                <Route path = "/" element = {<Loading />} />
                <Route path = "/weather" element = {<WeatherPage />} />
            </Routes>
        </Router>
    );


}

export default AppRoutes;
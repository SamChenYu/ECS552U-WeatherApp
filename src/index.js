import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Stars from './stars';
import App from './weather';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className="weather">
      <App />
    </div>

    <div className="stars">
      <Stars />
    </div>

  </React.StrictMode>
);
const script = document.createElement('script');
script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}&libraries=places`;
script.async = true;
document.head.append(script);
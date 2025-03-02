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

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './loading.css';



function Loading() {

    const [countdown, setCountdown] = useState(3);
    const navigate = useNavigate();

    useEffect(() => {
        if (countdown > 0) {
          const timer = setTimeout(() => {
            setCountdown( (prevCountDown) => prevCountDown - 1);
          }, 1000); 
    
          return () => clearTimeout(timer); 
        } else {
          navigate('/weather');
        }
      }, [countdown, navigate]); 

    return (
        <div className="loading_container">
            <div className="background_image"></div>
            <div className="loading_panel">
                <div className="loading_text">Loading...</div>
                <div className="loading_spinner"></div>
            </div>
        </div>
    );
}

export default Loading;
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
          navigate('/recommendations');
        }
      }, [countdown, navigate]); 

    return (
        <div className="loading_container">
            <div className="background_image"></div>
            <div className="loading_panel">
            <h1 className="loading_text" style={{ fontSize: "3rem", fontWeight: "bold", textAlign: "center" }}>StarGazor</h1>
                <div className="loading_text">Loading...</div>
                <div className="loading_spinner"></div>
            </div>
        </div>
    );
}

export default Loading;
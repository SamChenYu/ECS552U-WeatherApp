import './events.css'

const EventsWidget = ({ time, location }) => {
    return (
        <div className="events-widget">
            <h2>{time}</h2>
            <p>🌡 {location}°C</p>
        </div>
    );
};

export default EventsWidget;

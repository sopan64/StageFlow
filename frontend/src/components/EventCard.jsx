import "../styles/EventCard.css";

function EventCard({event}){

    return(
        <div className="event-card">
            <h2>Current Event</h2>
            <h3>{event.name}</h3>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Venue:</strong> {event.venue}</p>
            
        </div>
    );
}
export default EventCard;
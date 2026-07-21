import "../styles/EventCard.css";

function EventCard({event}){

    const today = new Date();
    const eventDate = new Date(event.date);
    const daysLeft = Math.ceil((eventDate - today)/(1000*60*60*24));
    const formattedDate = eventDate.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });

    return(
        <div className="event-card">
            <h2>Current Event</h2>
            <h3>{event.name}</h3>
            <p><strong>Date:</strong> {formattedDate}</p>
            <p><strong>Venue:</strong> {event.venue}</p>
            <p><strong>{daysLeft}</strong> Days Left</p>
            
        </div>
    );
}
export default EventCard;
import "../styles/EventCard.css";

function EventCard({ event }) {

    return (
        <div className="event-card">
            <h2>Current Event</h2>

            <div className="event-container">
                {event.length === 0 ? (
                    <p className="empty-message">Loading event...</p>
                ):(event.map((currentEvent) => {

                    const today = new Date();
                    const eventDate = new Date(currentEvent.date);

                    const daysLeft = Math.ceil(
                        (eventDate - today) / (1000 * 60 * 60 * 24)
                    );

                    const formattedDate = eventDate.toLocaleDateString(
                        "en-GB",
                        {
                            day: "numeric",
                            month: "short",
                            year: "numeric"
                        }
                    );

                    return (
                        <div
                            key={currentEvent._id}
                            className="event-item"
                        >
                            <h3>{currentEvent.name}</h3>

                            <p>
                                <strong>Event Date:</strong>{" "}
                                {formattedDate}
                            </p>

                            <p>
                                <strong>Venue:</strong>{" "}
                                {currentEvent.venue}
                            </p>

                            <p>
                                <strong>{daysLeft}</strong> Days Left
                            </p>
                        </div>
                    );
                }))}
            </div>
        </div>
    );
}

export default EventCard;
import "../styles/EventCard.css";
import Button from "./Button";
import event from "../data/events";
import { useNavigate } from "react-router-dom";

/*function handleViewDetails(){
    navigate("/slotdetails");
}*/

function EventCard({event}){
    const navigate = useNavigate();

    function handleViewDetails(){
        alert("Coming soon!");
    }
    return(
        <div className="event-card">
            <h2>Current Event</h2>
            <h3>{event.name}</h3>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Days Left:</strong> {event.daysLeft}</p>
            <Button 
                text="View Detais" 
                className="view-btn" 
                onClick={handleViewDetails}
            />
        </div>
    );
}
export default EventCard;
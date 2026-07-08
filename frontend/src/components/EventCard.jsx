import "../styles/EventCard.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

function handleViewDetails(){
    navigate("/slotdetails");
}

function EventCard(){
    const navigate = useNavigate();

    function handleViewDetails(){
        alert("Coming soon!");
    }
    return(
        <div className="event-card">
            <h2>Current Event</h2>
            <h3>Annual Night 2026</h3>
            <p><strong>Date:</strong> 25 july 2026</p>
            <p><strong>Days Left:</strong> 12</p>
            <Button 
                text="View Detais" 
                className="view-btn" 
                onClick={handleViewDetails}
            />
        </div>
    );
}
export default EventCard;
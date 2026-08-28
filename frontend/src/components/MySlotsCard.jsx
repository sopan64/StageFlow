import "../styles/MySlotsCard.css";
import { useNavigate } from "react-router-dom";

function MySlotsCard({ slots }){
    
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    
    const mySlots = slots.filter((slot) => 
        slot.members.some((member) => member._id === user.id)
    );

return (
    <div className="myslots-card">
        <h2>My Slots</h2>

        {mySlots.length === 0 ? (
            <p className="empty-message">
                You're not assigned to any slots yet...
            </p>
        ) : (
            mySlots.map((slot) => (
                <div
                    key={slot._id}
                    className="slot-item"
                    onClick={() => navigate(`/slotdetails/${slot._id}`)}
                >
                    <h3>{slot.title}</h3>

                    <p>Time: {slot.time}</p>

                    <p>Venue: {slot.venue}</p>

                    <p>
                        Coordinator:{" "}
                        {slot.coordinator?.name || "Not assigned"}
                    </p>
                </div>
            ))
        )}
    </div>
);
}
export default MySlotsCard;
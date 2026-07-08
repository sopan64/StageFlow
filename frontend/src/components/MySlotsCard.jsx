import "../styles/MySlotsCard.css";
import { useNavigate } from "react-router-dom";

function MySlotsCard({ slots }){
    const navigate = useNavigate();

    return (
        <div className="myslots-card">
            <h2>My Slots</h2>
            {
                slots.map((slot) => (
                    <p
                        key={slot.id}
                        onClick={() => navigate(`/slotdetails/${slot.id}`)}
                        className="slot-item"
                    >
                        {slot.name}
                    </p>
                ))
            }
        </div>
    );
}
export default MySlotsCard;
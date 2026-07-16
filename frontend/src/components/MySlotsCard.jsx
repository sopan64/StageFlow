import "../styles/MySlotsCard.css";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

function MySlotsCard({ slots }){
    const navigate = useNavigate();

    return (
        <div className="myslots-card">
            <h2>My Slots</h2>
            {
                slots.map((slot) => (
                    <div
                        key={slot.id}
                        className="slot-item"
                    >
                        <p
                            onClick={() => navigate(`/slotdetails/${slot.id}`)}
                            className="slot-name"
                        >
                            {slot.name}
                        </p>

                    </div>
                ))
            }
        </div>
    );
}
export default MySlotsCard;
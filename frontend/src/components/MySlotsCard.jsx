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
                        key={slot._id}
                        className="slot-item"
                    >
                        <p
                            onClick={() => navigate(`/slotdetails/${slot._id}`)}
                            className="slot-name"
                        >
                            {slot.title}
                        </p>

                    </div>
                ))
            }
        </div>
    );
}
export default MySlotsCard;
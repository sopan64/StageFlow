import "../styles/MySlotsCard.css";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

function MySlotsCard({ slots, handleDeleteSlot }){
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

                        <div className="slot-actions">

                            <Button
                                text="Edit"
                                onClick={() => navigate(`/edit-slot/${slot.id}`)}
                            />
                            <Button
                                text="Delete"
                                onClick={() => handleDeleteSlot(slot.id)}
                            />
                        </div>

                    </div>
                ))
            }
        </div>
    );
}
export default MySlotsCard;
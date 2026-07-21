import { useParams } from "react-router-dom";
import "../styles/SlotDetails.css";

function SlotDetails({slots}){
    
    const { id } = useParams();

    const slot = slots.find(
        (slot) => slot.id === Number(id)
    );
    
    if(!slot){
        return <h2>Slot not found!</h2>;
    }

    return (
        <div className="slot-details">
            <h1>Slot Details</h1>
            <h2>{slot.name}</h2>
            <p>Coordinator: {slot.coordinator}</p>
            <p>Time: {slot.time}</p>
            <p>Members: {slot.members}</p>
            <p>Venue: {slot.venue}</p>
        </div>
    );
}
export default SlotDetails;
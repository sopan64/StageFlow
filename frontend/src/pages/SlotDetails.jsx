import { useParams } from "react-router-dom";
import "../styles/SlotDetails.css";

function SlotDetails({slots}){
    
    const { id } = useParams();

    const slot = slots.find(
        (slot) => slot._id === id
    );
    
    if(!slot){
        return <h2>Slot not found!</h2>;
    }

    return (
        <div className="slot-details">
            <div className="slot-details-content">
            <h1>Slot Details</h1>
            <h2>{slot.title}</h2>
            <p>Coordinator: {slot.coordinator?.name}</p>
            <p>Time: {slot.time}</p>
            <p>Members</p>

<div className="slot-members">
    {slot.members.map((member) => (
        <div className="slot-member" key={member._id}>
            <span>{member.name}</span>
        </div>
    ))}
</div>
            <p>Venue: {slot.venue}</p>
            </div>
        </div>
    );
}
export default SlotDetails;
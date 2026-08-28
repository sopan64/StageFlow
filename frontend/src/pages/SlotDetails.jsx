import { useParams } from "react-router-dom";
import "../styles/SlotDetails.css";

function SlotDetails({ slots }) {

    const { id } = useParams();

    const slot = slots.find(
        (slot) => slot._id === id
    );

    if (!slot) {
        return <h2>Slot not found!</h2>;
    }

    return (
        <div className="slot-details">
            <div className="slot-details-content">
                <h1>Slot Details</h1>

                <h2>{slot.title}</h2>

                <div className="slot-info">
                    <p>
                        <strong>Time</strong>
                        {slot.time}
                    </p>

                    <p>
                        <strong>Venue</strong>
                        {slot.venue}
                    </p>

                    <p>
                        <strong>Coordinator</strong>
                        {slot.coordinator?.name || "Not assigned"}
                    </p>
                </div>

                <p className="members-title">Members</p>

                <div className="slot-members">
                    {slot.members.map((member) => (
                        <div className="slot-member" key={member._id}>
                            <span>{member.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SlotDetails;
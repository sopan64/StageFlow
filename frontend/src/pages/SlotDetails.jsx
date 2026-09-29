import { useNavigate, useParams } from "react-router-dom";
import "../styles/SlotDetails.css";
import Button from "../components/Button";

function SlotDetails({ slots }) {

    const { id } = useParams();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

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

                {user?.id === slot.coordinator?._id && (
                    <p className="coordinator-access">
                        <span>Coordinator access</span> . You can edit this slot
                    </p>
                )}

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

                {(user?.id === slot.coordinator?._id || user?.role === "admin") && (
                    <Button text="Edit slot" onClick={()=>navigate(`/edit-slot/${id}`)}/>
                )}
            </div>
        </div>
    );
}

export default SlotDetails;
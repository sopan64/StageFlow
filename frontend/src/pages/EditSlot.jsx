import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import "../styles/EditSlot.css";

function EditSlot({ slots, setSlots }){

    const { id } = useParams();

    const slot = slots.find(
        (slot) => slot.id === Number(id)
    );

    if(!slot){
        return <h2>Slot not found!</h2>;
    }

    const [name, setName] = useState(slot.name);
    const [coordinator, setCoordinator] = useState(slot.coordinator);
    const [time, setTime] = useState(slot.time);
    const [members, setMembers] = useState(slot.members);
    const [venue, setVenue] = useState(slot.venue);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    function handleUpdateSlot(){
        if(!name || !coordinator || !time || !members || !venue){
            setError("Please fill all fields!");
            return;
        }
        setSlots(
            slots.map((slot) =>{
                if(slot.id === Number(id)){
                    return {
                        id: slot.id,
                        name,
                        coordinator,
                        time,
                        members: Number(members),
                        venue
                    };
                }

                return slot;
            })
        );
        navigate("/dashboard");
    }

    return (
        <div className="edit-page">
            <h1>Edit Slot</h1>

            {
                error && <p className="error">{error}</p>
            }
            <Input
                type="text"
                placeholder="Slot name"
                value={name}
                onChange={(e) => setName(e.target.value)} 
            />

            <Input 
                type="text"
                placeholder="Coordinator name"
                value={coordinator}
                onChange={(e) => setCoordinator(e.target.value)}
            />

            <Input 
                type="text"
                placeholder="Time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
            />

            <Input 
                type="text"
                placeholder="Members"
                value={members}
                onChange={(e) => setMembers(e.target.value)}
            />

            <Input 
                type="text"
                placeholder="Venue"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
            />

            <Button 
                text="Save Changes"
                className="form-btn"
                onClick={handleUpdateSlot}
            />

        </div>
    );
}
export default EditSlot;
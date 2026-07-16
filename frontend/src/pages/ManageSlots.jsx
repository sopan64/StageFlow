import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import "../styles/ManageSlots.css";

function ManageSlots({ slots, setSlots, handleDeleteSlot, announcements, setAnnouncements }){
    const [error, setError] = useState("");
    const [name, setName] = useState("");
    const [coordinator, setCoordinator] = useState("");
    const [time, setTime] = useState("");
    const [members, setMembers] = useState("");
    const [venue, setVenue] = useState("");
    const navigate = useNavigate();

    function handleCreateSlot(){

        if(!name || !coordinator || !time || !members || !venue){
            setError("Please fill all fields!");
            return;
        }

        const newslot = {
            id: Date.now(),
            name,
            coordinator,
            time,
            members: Number(members),
            venue
        };

        const newAnnouncement = {
            id: Date.now()+1,
            type: "system",
            message: `New slot "${name}" has been created!`,
            date: new Date().toLocaleDateString("en-GB")
        };

        setSlots([...slots, newslot]);
        setAnnouncements((prevAnnouncements) => [
            newAnnouncement,
            ...prevAnnouncements
        ]);

        setName("");
        setCoordinator("");
        setTime("");
        setMembers("");
        setVenue("");
        setError("");
        navigate("/manage-slots");
    }

    return (
        <div className="admin-page">
            <h1>Manage Slots</h1>

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
                text="Create Slot"
                className="form-btn"
                onClick={handleCreateSlot}
            />
            <hr />
            <h2>All Slots</h2>

            {
                slots.map((slot) => (
                    <div key={slot.id}>
                        <p
                            onClick={() => navigate(`/slotdetails/${slot.id}`)}
                            className="slot-name"
                        >{slot.name}</p>
                        
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

export default ManageSlots;
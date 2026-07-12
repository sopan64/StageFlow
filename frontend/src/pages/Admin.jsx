import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import "../styles/Admin.css";

function Admin({ slots, setSlots }) {
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
        setSlots([...slots, newslot]);
        setName("");
        setCoordinator("");
        setTime("");
        setMembers("");
        setError("");
        navigate("/dashboard");
    }

    return (
        <div className="admin-page">
            <h1>Admin Panel</h1>

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

        </div>
    );
}

export default Admin;
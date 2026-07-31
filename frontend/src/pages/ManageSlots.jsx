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

    async function handleCreateSlot(){
        
        if(!name || !coordinator || !time || !members || !venue){
            setError("Please fill all fields!");
            return;
        }

        const newslot = {
            title: name,
            coordinator,
            time,
            members: Number(members),
            venue
        };

        const newAnnouncement = {
            id: Date.now()+1,
            type: "system",
            message: `New slot "${name}" has been created!`,
            date: new Date().toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            })
        };

        try {
        const response = await fetch("http://localhost:5000/slots", {

            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(newslot)
        });

        if(!response.ok) {
            throw new Error("Failed to Create slot!");
        }

        const data = await response.json();

        setSlots((prevSlots) => [...prevSlots, data.slot]);

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
        navigate("/manage-slots", {replace: true});
        }
        catch (err) {
            setError(err.message);
        }
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
                    <div key={slot._id}>
                        <p
                            onClick={() => navigate(`/slotdetails/${slot._id}`)}
                            className="slot-name"
                        >{slot.title}</p>
                        
                        <div className="slot-actions">
                            <Button 
                                text="Edit"
                                onClick={() => navigate(`/edit-slot/${slot._id}`)}
                            />
                            <Button 
                                text="Delete"
                            onClick={() => {
                                const confirmDelete = window.confirm(
                                    `Are you sure want to Delete "${slot.title}"?`
                                );
                                if(confirmDelete){
                                    handleDeleteSlot(slot._id);
                                }
                            }}
                            />
                        </div>
                    </div>
                ))
            }

        </div>
    );
}

export default ManageSlots;
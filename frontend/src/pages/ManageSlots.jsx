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
        if(Number(members) < 1){
            setError("Members should be greater than or equal to 1!");
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
            type: "system",
            message: `New slot "${name}" has been created!`
        };

        try {
        const slotsResponse = await fetch("http://localhost:5000/slots", {

            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(newslot)
        });

        if(!slotsResponse.ok) {
            throw new Error("Failed to Create slot!");
        }

        const slotsData = await slotsResponse.json();

        setSlots((prevSlots) => [...prevSlots, slotsData.slot]);
        setName("");
        setCoordinator("");
        setTime("");
        setMembers("");
        setVenue("");
        setError("");

        const announcementsResponse = await fetch("http://localhost:5000/announcements", {
            method: "POST",
            headers:{
                "content-Type": "application/json"
            },
            body: JSON.stringify(newAnnouncement)
        });

        if(!announcementsResponse.ok){
            throw new Error("Failed to create announcement!");
        }

        const announcementsData = await announcementsResponse.json();

        setAnnouncements((prevAnnouncements) => [
            announcementsData,
            ...prevAnnouncements
        ]);

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
                type="number"
                min="1"
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
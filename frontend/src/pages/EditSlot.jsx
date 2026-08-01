import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import "../styles/EditSlot.css";

function EditSlot({ slots, setSlots, announcements, setAnnouncements }){

    const { id } = useParams();

    const slot = slots.find(
        (slot) => slot._id === id
    );

    if(!slot){
        return <h2>Slot not found!</h2>;
    }

    const [name, setName] = useState(slot.title);
    const [coordinator, setCoordinator] = useState(slot.coordinator);
    const [time, setTime] = useState(slot.time);
    const [members, setMembers] = useState(slot.members);
    const [venue, setVenue] = useState(slot.venue);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function handleUpdateSlot(){
        if(!name || !coordinator || !time || !members || !venue){
            setError("Please fill all fields!");
            return;
        }
        if(Number(members) < 1){
            setError("Members should be greater than or equal to 1!");
            return;
        }

        const newAnnouncement = {
            type: "system",
            message: `Slot "${name}" has been updated!`
        };

        const updatedSlot = {
            title: name,
            coordinator,
            time,
            members: Number(members),
            venue
        };
        
        try{
            const response = await fetch(`http://localhost:5000/slots/${id}`, {
                method: "PUT",
                headers: {
                    "content-Type": "application/json"
                },

                body: JSON.stringify(updatedSlot)
            });

            if(!response.ok){
                throw new Error("Faild to edit slot!");
            }

            const data = await response.json();

            setSlots((prevSlots) => 
                prevSlots.map((slot) => slot._id === id? data.slot : slot)
            );

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

            setError("");
            navigate("/manage-slots", {replace: true});

        } 
        catch (err) {
            setError(err.message);
        }
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
                text="Save Changes"
                className="form-btn"
                onClick={handleUpdateSlot}
            />

        </div>
    );
}
export default EditSlot;
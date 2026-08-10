import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import "../styles/ManageEvent.css";
import AdminOnlyOverlay from "../components/AdminOnlyOverlay";

function ManageEvent({event, setEvent, announcements, setAnnouncements}) {
    const currentEvent = event[0];
    const [name, setName] = useState(currentEvent.name);
    const [date, setDate] = useState(currentEvent.date.split("T")[0]);
    const [venue, setVenue] = useState(currentEvent.venue);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function handleSaveChanges(){

        if(!name || !date || !venue){
            setError("Please fill all the fields!");
            return;
        }
        const updatedEvent = {
            name, date, venue
        };

        const newAnnouncement = {
            type: "system",
            message: "Event details has been changed!"
        };

        try{
            const token = localStorage.getItem("token");
            const eventResponse = await fetch(`${import.meta.env.VITE_API_URL}/event/${currentEvent._id}`, {
                method: "PUT",
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(updatedEvent)
            });

            const eventData = await eventResponse.json();
            if(!eventResponse.ok){
                throw new Error(eventData.message || "Faild to edit event!");
            }
            setEvent([eventData]);

            const announcementResponse = await fetch(`${import.meta.env.VITE_API_URL}/announcements`, {
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(newAnnouncement)
            });

            const announcementData = await announcementResponse.json();
            if(!announcementResponse.ok){
                throw new Error(announcementData.message || "Failed to add announcement!");
            }

            setAnnouncements((prevAnnouncements) => [
                announcementData,
                ...prevAnnouncements
            ]);

            navigate("/dashboard", {replace: true});
        }
        catch (err){
            setError(err.message);
        }
    }

    return (
        <AdminOnlyOverlay>
        <div className="manage-event">
            <h2>Manage Event</h2>
            {
                error && <p className="error">{error}</p>
            }
            <Input 
                type="text"
                placeholder="Event Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <Input 
                type="date"
                placeholder="Event Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            <Input 
                type="text"
                placeholder="Event Venue"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
            />
            <Button 
                text="Update Event"
                onClick={handleSaveChanges}
            />
        </div>
        </AdminOnlyOverlay>
    );
}

export default ManageEvent;
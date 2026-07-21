import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { Navigate, useNavigate } from "react-router-dom";
import "../styles/ManageEvent.css";

function ManageEvent({event, setEvent}) {
    const [name, setName] = useState(event.name);
    const [date, setDate] = useState(event.date);
    const [venue, setVenue] = useState(event.venue);
    const navigate = useNavigate();

    function handleSaveChanges(){
        setEvent({
            name,
            date,
            venue
        });

        navigate("/dashboard", {replace: true});
    }

    return (
        <div className="manage-event">
            <h2>Manage Event</h2>
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
    );
}

export default ManageEvent;
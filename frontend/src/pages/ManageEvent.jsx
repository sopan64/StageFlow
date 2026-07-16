import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";

function ManageEvent({event, setEvent}) {
    const [name, setName] = useState(event.name);
    const [date, setDate] = useState(event.date);
    const [venue, setVenue] = useState(event.venue);

    function handleSaveChanges(){
        setEvent({
            name,
            date,
            venue
        });
    }

    return (
        <div>
            <h3>Manage Event</h3>
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
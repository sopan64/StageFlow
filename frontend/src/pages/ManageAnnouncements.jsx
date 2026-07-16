import { useState } from "react";
import Button from "../components/Button";

function ManageAnnouncements({ announcements, setAnnouncements }) {
    const [message, setMessage] = useState("");
    const [date, setDate] = useState("");

    function handleAddAnnouncement() {
        if(!message) {
            return; 
        }

        const newAnnouncement = {
            id : Date.now(),
            type: "admin",
            message,
            date: new Date().toLocaleDateString()
        };
        setAnnouncements((prevAnnouncements) => [newAnnouncement, ...prevAnnouncements]);
        setMessage("");
        setDate("");
    }

    function handleDeleteAnnouncement(id) {
        setAnnouncements((prevAnnouncements) =>
            prevAnnouncements.filter((announcement) => announcement.id !== id)
        );
    }

    return (
        <div>
            <h2>Manage Announcements</h2>

            <textarea
                placeholder="Write an announcement..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
            />

            <br />

            <Button text="Add Announcement" onClick={handleAddAnnouncement} />

            <h3>Existing Announcements</h3>

            {announcements.map((announcement) => (
                <div key={announcement.id}>
                    <p>
                        {announcement.type === "admin"
                            ? "📢 Admin"
                            : "🔔 System"}
                    </p>

                    <p>{announcement.message}</p>
                    <p>{announcement.date}</p>
                    {announcement.type === "admin" ? 
                        <Button text="Delete" 
                        onClick={() => handleDeleteAnnouncement(announcement.id)} /> 
                    : null}
                </div>
            ))}
        </div>
    );
}

export default ManageAnnouncements;
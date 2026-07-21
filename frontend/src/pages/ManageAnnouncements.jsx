import { useState } from "react";
import Button from "../components/Button";

import "../styles/ManageAnnouncements.css";

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
            date: new Date().toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            })
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
        <div className="manage-announcements">
            <h2>Manage Announcements</h2>

            <textarea
                placeholder="Write an announcement..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
            />

            <Button text="Add Announcement" onClick={handleAddAnnouncement} />

            <hr />
            <h3>Existing Announcements</h3>

            {announcements.map((announcement) => (
                <div 
                    key={announcement.id}
                    className="announcement-item"
                >
                    <p>
                        {announcement.type === "admin"
                            ? "📢 Admin"
                            : "🔔 System"
                        }
                    </p>

                    <p>{announcement.message}</p>
                    <p className="announcement-date">{announcement.date}</p>
                    {
                        announcement.type === "admin" && (
                            <div className="announcement-actions">
                                <Button
                                    text="Delete"
                                    onClick={() => handleDeleteAnnouncement(announcement.id)}
                                />
                            </div>
                        )
                    }
                </div>
            ))}
        </div>
    );
}

export default ManageAnnouncements;
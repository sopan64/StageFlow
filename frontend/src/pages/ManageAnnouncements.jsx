import { useState } from "react";
import Button from "../components/Button";

import "../styles/ManageAnnouncements.css";

function ManageAnnouncements({ announcements, setAnnouncements }) {
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    async function handleAddAnnouncement() {
        if(!message) {
            setError("Please fill the message field!");
            return; 
        }

        const newAnnouncement = {
            type: "admin",
            message
        };

        try{
            const response = await fetch("http://localhost:5000/announcements", {
                method: "POST",
                headers: {
                    "content-Type": "application/json"
                },
                body: JSON.stringify(newAnnouncement)
            });

            if(!response.ok){
                throw new Error("Faild to Create announcement!");
            }

            const data = await response.json();

            setAnnouncements((prevAnnouncements) => [data, ...prevAnnouncements]);
            setMessage("");
        }
        catch (err) {
            setError(err.message);
        }
    }

    async function handleDeleteAnnouncement(id) {
        try {
            const response = await fetch(`http://localhost:5000/announcements/${id}`, {
                method: "DELETE"
            });

            if(!response.ok){
                throw new Error("Faild to Delete announcement!");
            }

            setAnnouncements((prevAnnouncements) =>
                prevAnnouncements.filter((announcement) => announcement._id !== id)
            );
        }
        catch (err){
            setError(err.message);
        }
    }

    return (
        <div className="manage-announcements">
            <h2>Manage Announcements</h2>

            {
                error && <p className="error">{error}</p>
            }

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
                    key={announcement._id}
                    className="announcement-item"
                >
                    <p>
                        {announcement.type === "admin"
                            ? "📢 Admin"
                            : "🔔 System"
                        }
                    </p>

                    <p>{announcement.message}</p>
                    <p className="announcement-date">
                        {new Date(announcement.createdAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit"
                        })}
                    </p>
                    {
                        announcement.type === "admin" && (
                            <div className="announcement-actions">
                                <Button
                                    text="Delete"
                                    onClick={() => handleDeleteAnnouncement(announcement._id)}
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
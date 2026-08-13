import { useState } from "react";
import Button from "../components/Button";
import "../styles/ManageAnnouncements.css";
import AdminOnlyOverlay from "../components/AdminOnlyOverlay";

function ManageAnnouncements({ announcements, setAnnouncements }) {
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    async function handleAddAnnouncement() {
        if (!message) {
            setError("Please fill the message field!");
            return;
        }

        const newAnnouncement = {
            type: "admin",
            message
        };

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/announcements`,
                {
                    method: "POST",
                    headers: {
                        "content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(newAnnouncement)
                }
            );

            if (!response.ok) {
                throw new Error("Failed to create announcement!");
            }

            const data = await response.json();

            setAnnouncements((prevAnnouncements) => [
                data,
                ...prevAnnouncements
            ]);

            setMessage("");
            setError("");
        } catch (err) {
            setError(err.message);
        }
    }

    async function handleDeleteAnnouncement(id) {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/announcements/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error("Failed to delete announcement!");
            }

            setAnnouncements((prevAnnouncements) =>
                prevAnnouncements.filter(
                    (announcement) => announcement._id !== id
                )
            );
        } catch (err) {
            setError(err.message);
        }
    }

    const adminAnnouncements = announcements.filter(
        (announcement) => announcement.type === "admin"
    );

    return (
        <AdminOnlyOverlay>
            <div className="manage-announcements">
                <div className="manage-announcements-content">
                <h2>Manage Announcements</h2>

                {error && <p className="error">{error}</p>}

                <textarea
                    placeholder="Write an announcement..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                />

                <Button
                    text="Add Announcement"
                    onClick={handleAddAnnouncement}
                />

                <hr />

                <h3>Existing Announcements</h3>

                {adminAnnouncements.length === 0 ? (
                    <p className="empty-message">
                        No announcements yet...
                    </p>
                ) : (
                    adminAnnouncements.map((announcement) => (
                        <div
                            key={announcement._id}
                            className="announcement-item"
                        >
                            <p>📢 Admin</p>

                            <p>{announcement.message}</p>

                            <p className="announcement-date">
                                {new Date(
                                    announcement.createdAt
                                ).toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit"
                                })}
                            </p>

                            <div className="announcement-actions">
                                <Button
                                    text="Delete"
                                    className="red-button"
                                    onClick={() =>
                                        handleDeleteAnnouncement(
                                            announcement._id
                                        )
                                    }
                                />
                            </div>
                        </div>
                    ))
                )}
                </div>
            </div>
        </AdminOnlyOverlay>
    );
}

export default ManageAnnouncements;
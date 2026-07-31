import "../styles/Announcements.css";
import Button from "../components/Button";

function Announcements({ announcements }) {
    return (
        <div className="announcements-page">
            <h2>Announcements</h2>
            <div className="announcements-container">
                {
                announcements.map((announcement) => (
                    <div key={announcement._id} className="announcement-item">
                        <h4>
                            {announcement.type === "admin"
                                ? "📢 Admin"
                                : "🔔 System"
                            }
                        </h4>
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
                    </div>
                ))
                }
            </div>
        </div>
    );
}
export default Announcements;
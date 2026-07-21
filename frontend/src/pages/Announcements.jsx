import "../styles/Announcements.css";
import Button from "../components/Button";

function Announcements({ announcements }) {
    return (
        <div className="announcements-page">
            <h2>Announcements</h2>
            <div className="announcements-container">
                {
                announcements.map((announcement) => (
                    <div key={announcement.id} className="announcement-item">
                        <h4>
                            {announcement.type === "admin"
                                ? "📢 Admin"
                                : "🔔 System"
                            }
                        </h4>
                        <p>{announcement.message}</p>
                        <p className="announcement-date">{announcement.date}</p>
                    </div>
                ))
                }
            </div>
        </div>
    );
}
export default Announcements;
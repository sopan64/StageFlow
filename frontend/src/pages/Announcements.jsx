import "../styles/Announcements.css";
import Button from "../components/Button";

function Announcements({ announcements }) {
    return (
        <div className="announcements-page">
            <h2>Announcements</h2>
            {
                announcements.map((announcement) => (
                    <div key={announcement.id} className="announcement">
                        {announcement.type === "admin" ? <p>📢 Admin</p> : <p>🔔 System</p>}
                        <p>{announcement.message}</p>
                        <p>{announcement.date}</p>
                    </div>
                ))
            }
        </div>
    );
}
export default Announcements;
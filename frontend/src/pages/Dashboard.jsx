import EventCard from "../components/EventCard";
import MySlotsCard from "../components/MySlotsCard";
import "../styles/Dashboard.css";

function Dashboard({ slots, event }){

    return (
        <div className="dashboard">
            <EventCard event={event} />
            <MySlotsCard slots={slots} />
        </div>
    );
}

export default Dashboard;
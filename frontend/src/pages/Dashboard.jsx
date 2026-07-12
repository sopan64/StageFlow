import EventCard from "../components/EventCard";
import MySlotsCard from "../components/MySlotsCard";
import UpdatesCard from "../components/UpdatesCard";
import "../styles/Dashboard.css";
import updates from "../data/updates";
import event from "../data/events";

function Dashboard({ slots, handleDeleteSlot}){

    return (
        <div className="dashboard">
            <EventCard event={event} />
            <UpdatesCard updates={updates}/>
            <MySlotsCard slots={slots} handleDeleteSlot={handleDeleteSlot}/>
        </div>
    );
}

export default Dashboard;
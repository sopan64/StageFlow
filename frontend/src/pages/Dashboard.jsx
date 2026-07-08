import EventCard from "../components/EventCard";
import MySlotsCard from "../components/MySlotsCard";
import UpdatesCard from "../components/UpdatesCard";
import "../styles/Dashboard.css";

const updates = [
    "Slot 2 timing changed",
    "Aman added to slot 1",
    "Coordinator changed for slot 3"
];

const slots = [
    { id: 1, name: "Acoustic Band"},
    { id: 2, name: "Final Performance"},
    { id: 3, name: "Opening Ceremony"}
];

function Dashboard(){
    return (
        <div className="dashboard">
            <EventCard />
            <UpdatesCard updates={updates}/>
            <MySlotsCard slots={slots}/>
        </div>
    );
}

export default Dashboard;
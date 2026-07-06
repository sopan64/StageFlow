import "../styles/Sidebar.css";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Dashboard from "../pages/Dashboard";


function Sidebar(){
    return (
        <div className="sidebar">

            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/myslots">My Slots</NavLink>
            <NavLink to="/attendance">Attendance</NavLink>
            <NavLink to="/announcements">Announcements</NavLink>

        </div>
    );
}
export default Sidebar;
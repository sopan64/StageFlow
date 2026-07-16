import "../styles/Sidebar.css";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Dashboard from "../pages/Dashboard";


function Sidebar(){
    return (
        <div className="sidebar">

            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/manage-slots">Manage Slots</NavLink>
            <NavLink to="/attendance">Attendance</NavLink>
            <NavLink to="/announcements">Announcements</NavLink>
            <NavLink to="/manage-announcements">Manage Announcements</NavLink>
            <NavLink to="/manage-event">Manage Event</ NavLink>
        </div>
    );
}
export default Sidebar;
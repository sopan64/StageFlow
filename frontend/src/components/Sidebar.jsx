import "../styles/Sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "./Button";

function Sidebar({ isOpen, onClose }){

    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/", {replace: true});
    }

    function handleNavClick() {
        onClose();
    }

    return (
        <div className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>

            <button
                className="sidebar-close"
                onClick={onClose}
            >
                ✕
            </button>

            <NavLink to="/dashboard" onClick={handleNavClick}>Dashboard</NavLink>
            <NavLink to="/attendance" onClick={handleNavClick}>Attendance</NavLink>
            <NavLink to="/announcements" onClick={handleNavClick}>Announcements</NavLink>
            <NavLink to="/manage-slots" onClick={handleNavClick}>Manage Slots</NavLink>
            <NavLink to="/manage-announcements" onClick={handleNavClick}>Manage Announcements</NavLink>
            <NavLink to="/manage-event" onClick={handleNavClick}>Manage Event</ NavLink>
            <NavLink to="/manage-users" onClick={handleNavClick}>Manage Users</NavLink>
            <Button 
                text="Logout"
                onClick={() => {
                    const confirmLogout = window.confirm(
                        "Are you sure want to Logout?"
                    );
                    if(confirmLogout){
                        handleLogout();
                    }
                }}
            />
        </div>
    );
}
export default Sidebar;
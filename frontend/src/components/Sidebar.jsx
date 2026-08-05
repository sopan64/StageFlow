import "../styles/Sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "./Button";

function Sidebar(){

    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/", {replace: true});
    }
    return (
        <div className="sidebar">

            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/manage-slots">Manage Slots</NavLink>
            <NavLink to="/attendance">Attendance</NavLink>
            <NavLink to="/announcements">Announcements</NavLink>
            <NavLink to="/manage-announcements">Manage Announcements</NavLink>
            <NavLink to="/manage-event">Manage Event</ NavLink>
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
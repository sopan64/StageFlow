import "../styles/Layout.css";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "../styles/Layout.css";
import { Outlet } from "react-router-dom";

function MainLayout() {
    return (
        <div className="layout">

            <Sidebar />

            <div className="main-content">

                <Topbar />

                <Outlet />

            </div>

        </div>
    );
}

export default MainLayout;
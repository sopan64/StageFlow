import "../styles/Layout.css";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "../styles/Layout.css";
import { Outlet } from "react-router-dom";
import { useState } from "react";

function MainLayout() {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    function closeSidebar() {
        setSidebarOpen(false);
    }
    return (
        <div className="layout">

            <button
                className="mobile-menu-button"
                onClick={() => setSidebarOpen(true)}
            >
                ☰
            </button>

            <Sidebar 
                isOpen={sidebarOpen}
                onClose={closeSidebar}
            />

            {sidebarOpen && (
                <div
                    className="sidebar-backdrop"
                    onClick={closeSidebar}
                ></div>
            )}

            <div className="main-content">

                <Topbar />

                <Outlet />

            </div>

        </div>
    );
}

export default MainLayout;
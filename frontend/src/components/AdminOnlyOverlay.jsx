import "../styles/AdminOnlyOverlay.css";

function AdminOnlyOverlay({ children }) {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user?.role === "admin") {
        return children;
    }

    return (
        <div className="admin-page">
            <div className="blurred-content">
                {children}
            </div>

            <div className="admin-overlay">
                <div className="admin-message">
                    <h2>🔒 Admin Only</h2>
                    <h5>(You are not an admin)</h5>
                    <p>This feature is available only to administrators.</p>
                </div>
            </div>
        </div>
    );
}

export default AdminOnlyOverlay;
import "../styles/Topbar.css";

function Topbar() {

    const user = JSON.parse(localStorage.getItem("user"));
    return (
        <div className="topbar">

            <h3>Welcome, {user?.name?.split(" ")[0]}👋</h3>

        </div>
    );
}

export default Topbar;
import { useState } from "react";
import AdminOnlyOverlay from "../components/AdminOnlyOverlay";
import "../styles/ManageUsers.css";
import Button from "../components/Button";

function ManageUsers({ users, setUsers }) {

    async function handleRole(id, role){
        try{
            const token = localStorage.getItem("token");
            const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${id}/manage-role`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = await response.json();
            if(!response.ok){
                throw new Error(data.message || "Failed to change the role!");
            }

            setUsers((prevUsers) =>
                prevUsers.map((user) => user._id === id ? data : user)
            );
        }
        catch(err){
            alert(err.message);
        }
    }
    
    return (
        <AdminOnlyOverlay>
            <div className="manage-users">
                <div className="manage-users-content">
                <h2>Manage Users</h2>

                {users.length ===  0 ? (
                    <p className="empty-message">No users yet...</p>
                ) : (users.map((user) => (
                    <div key={user._id} className="user-item">

                        <div className="user-info">
                            <h3>{user.name}</h3>
                            <p>{user.email}</p>
                        </div>

                        <Button text={
                            user.role === "member"
                            ? "Make Admin"
                            : "Make Member"
                            }
                            onClick={() => handleRole(user._id, user.role)}
                        />
                    </div>
                )))}
                </div>
            </div>
        </AdminOnlyOverlay>
    );
}

export default ManageUsers;
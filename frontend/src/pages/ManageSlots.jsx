import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import "../styles/ManageSlots.css";
import AdminOnlyOverlay from "../components/AdminOnlyOverlay";

function ManageSlots({ slots, setSlots, handleDeleteSlot, announcements, setAnnouncements }){
    const [error, setError] = useState("");
    const [name, setName] = useState("");
    const [coordinator, setCoordinator] = useState(null);
    const [time, setTime] = useState("");
    const [members, setMembers] = useState([]);
    const [memberEmail, setMemberEmail] = useState("");
    const [memberResults, setMemberResults] = useState([]);
    const [venue, setVenue] = useState("");
    const navigate = useNavigate();

    async function searchMembers(email) {
    setMemberEmail(email);

    if (!email) {
        setMemberResults([]);
        return;
    }

    try {
        const token = localStorage.getItem("token");

        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/users/search?email=${email}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        if (response.ok) {
            setMemberResults(data);
        }
    }
    catch (err) {
        console.log(err);
    }
}

    async function handleCreateSlot(){
        
        if(!name || !coordinator || !time || !venue){
            setError("Please fill all fields!");
            return;
        }

        if(members.length === 0){
            setError("Please add atleast one member!");
            return;
        }

        const newslot = {
            title: name,
            coordinator: coordinator._id,
            time,
            members: members.map((user) => user._id),
            venue
        };

        const newAnnouncement = {
            type: "system",
            message: `New slot "${name}" has been created!`
        };

        try {
        const token = localStorage.getItem("token");    
        const slotsResponse = await fetch(`${import.meta.env.VITE_API_URL}/slots`, {

            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },

            body: JSON.stringify(newslot)
        });

        const slotsData = await slotsResponse.json();

        if(!slotsResponse.ok) {
            throw new Error(slotsData.message || "Failed to Create slot!");
        }

        setSlots((prevSlots) => [...prevSlots, slotsData.slot]);
        setName("");
        setCoordinator(null);
        setTime("");
        setMembers([]);
        setMemberEmail("");
        setMemberResults([]);
        setVenue("");
        setError("");

        const announcementsResponse = await fetch(`${import.meta.env.VITE_API_URL}/announcements`, {
            method: "POST",
            headers:{
                "content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(newAnnouncement)
        });

        const announcementsData = await announcementsResponse.json();
        if(!announcementsResponse.ok){
            throw new Error(
                announcementsData.message || "Failed to create announcement!"
            );
        }

        setAnnouncements((prevAnnouncements) => [
            announcementsData,
            ...prevAnnouncements
        ]);

        navigate("/manage-slots", {replace: true});
        }
        catch (err) {
            setError(err.message);
        }
    }

    return (
        <AdminOnlyOverlay>
        <div className="admin-page">
            <div className="admin-page-content">
            <h1>Manage Slots</h1>

            {
                error && <p className="error">{error}</p>
            }
            <Input
                type="text"
                placeholder="Slot name"
                value={name}
                onChange={(e) => setName(e.target.value)} 
            />            

            <Input 
                type="text"
                placeholder="Time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
            />

            <Input 
                type="text"
                placeholder="Search members by email"
                value={memberEmail}
                onChange={(e) => searchMembers(e.target.value)}
            />

{memberResults.length > 0 && (
    <div className="member-search-results">
        {memberResults.map((user) => (
            <div className="member-search-item" key={user._id}>
                <div>
                    <p>{user.name}</p>
                    <span>{user.email}</span>
                </div>

                <Button
                    text="Add"
                    onClick={() => {
                        setMembers((prev) => {
                            if (prev.some((member) => member._id === user._id)) {
                                return prev;
                            }

                            return [...prev, user];
                        });

                        setMemberEmail("");
                        setMemberResults([]);
                    }}
                />
            </div>
        ))}
    </div>
)}

{members.length > 0 && (
    <div className="member-search-results member-list">
        {members.map((user) => (
            <div className="member-search-item" key={user._id}>
                <div>
                    <p>{user.name}</p>
                    <span>{user.email}</span>
                </div>

                <Button
                    text="Remove"
                    className="red-button"
                    onClick={() => {
                        setMembers((prev) =>
                            prev.filter((member) => member._id !== user._id)
                        );
                    }}
                />
            </div>
        ))}
    </div>
)}

            <Input 
                type="text"
                placeholder="Venue"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
            />

{members.length > 0 && (
    <select
        value={coordinator?._id || ""}
        onChange={(e) => {
            const selectedUser = members.find(
                (user) => user._id === e.target.value
            );

            setCoordinator(selectedUser);
        }}
    >
        <option value="">Assign Coordinator</option>

        {members.map((user) => (
            <option key={user._id} value={user._id}>
                {user.name} - {user.email}
            </option>
        ))}
    </select>
)}

            <Button 
                text="Create Slot"
                className="form-btn"
                onClick={handleCreateSlot}
            />
            <hr />
            <h2>All Slots</h2>

            {slots.length === 0 ? (
                <p className="empty-message">No slots yet...</p>
                ):(slots.map((slot) => (
                    <div key={slot._id}>
                        <p
                            onClick={() => navigate(`/slotdetails/${slot._id}`)}
                            className="slot-name"
                        >{slot.title}</p>
                        
                        <div className="slot-actions">
                            <Button 
                                text="Edit"
                                onClick={() => navigate(`/edit-slot/${slot._id}`)}
                            />
                            <Button 
                                text="Delete"
                                className="red-button"
                            onClick={() => {
                                const confirmDelete = window.confirm(
                                    `Are you sure want to Delete "${slot.title}"?`
                                );
                                if(confirmDelete){
                                    handleDeleteSlot(slot._id);
                                }
                            }}
                            />
                        </div>
                    </div>
                ))
            )}
        </div>
        </div>
        </AdminOnlyOverlay>
    );
}

export default ManageSlots;
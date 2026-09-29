import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import "../styles/EditSlot.css";

function EditSlot({ slots, setSlots, announcements, setAnnouncements }){

    const { id } = useParams();
    const navigate = useNavigate();

    const slot = slots.find(
        (slot) => slot._id === id
    );

    const [name, setName] = useState("");
    const [coordinator, setCoordinator] = useState(null);
    const [time, setTime] = useState("");
    const [members, setMembers] = useState([]);
    const [memberEmail, setMemberEmail] = useState("");
    const [memberResults, setMemberResults] = useState([]);
    const [venue, setVenue] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (slot) {
            setName(slot.title);
            setCoordinator(slot.coordinator);
            setTime(slot.time);
            setMembers(slot.members);
            setVenue(slot.venue);
        }
    }, [slot]);

    if(!slot){
        return <h2>Slot not found!</h2>;
    }

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

    async function handleUpdateSlot(){
        if(!name || !time || !venue){
            setError("Please fill all fields!");
            return;
        }
        if(members.length === 0){
            setError("Please add atleast one member!");
            return;
        }

        if (!coordinator) {
            setError("Please select a coordinator!");
            return;
        }

        const newAnnouncement = {
            type: "system",
            message: `Slot "${name}" has been updated!`
        };

        const updatedSlot = {
            title: name,
            coordinator: coordinator._id,
            time,
            members: members.map((user) => user._id),
            venue
        };
        
        try{
            const token = localStorage.getItem("token");
            const response = await fetch(`${import.meta.env.VITE_API_URL}/slots/${id}`, {
                method: "PUT",
                headers: {
                    "content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },

                body: JSON.stringify(updatedSlot)
            });

            const data = await response.json();
            if(!response.ok){
                throw new Error(data.message || "Faild to edit slot!");
            }

            setSlots((prevSlots) => 
                prevSlots.map((slot) => slot._id === id? data.slot : slot)
            );

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

            setError("");
            navigate("/dashboard", {replace: true});

        } 
        catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="edit-page">
            <div className="edit-page-content">
            <h1>Edit Slot</h1>

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
        <option value="">Select Coordinator</option>

        {members.map((user) => (
            <option key={user._id} value={user._id}>
                {user.name} - {user.email}
            </option>
        ))}
    </select>
)}            

            <Button 
                text="Save Changes"
                className="form-btn"
                onClick={handleUpdateSlot}
            />
            </div>
        </div>
    );
}
export default EditSlot;
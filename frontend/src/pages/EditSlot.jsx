import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import "../styles/EditSlot.css";

function EditSlot({ slots, setSlots, announcements, setAnnouncements }){

    const { id } = useParams();

    const slot = slots.find(
        (slot) => slot._id === id
    );

    if(!slot){
        return <h2>Slot not found!</h2>;
    }

    const [name, setName] = useState(slot.title);
    const [coordinator, setCoordinator] = useState(slot.coordinator);
    const [time, setTime] = useState(slot.time);
    const [members, setMembers] = useState(slot.members);
    const [memberEmail, setMemberEmail] = useState("");
    const [memberResults, setMemberResults] = useState([]);
    const [venue, setVenue] = useState(slot.venue);
    const [error, setError] = useState("");
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
            navigate("/manage-slots", {replace: true});

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

{memberResults.map((user) => (
    <div key={user._id}>
        <p>{user.name}</p>
        <p>{user.email}</p>

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

{members.map((user) => (
    <div key={user._id}>
        <span>{user.name}</span>

        <Button
            text="Remove"
            onClick={() => {
                setMembers((prev) =>
                    prev.filter((member) => member._id !== user._id)
                );
            }}
        />
    </div>
))}

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
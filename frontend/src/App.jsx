import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Attendance from "./pages/Attendance";
import MainLayout from "./layouts/MainLayout";
import Announcements from "./pages/Announcements";
import SlotDetails from "./pages/SlotDetails";
import ManageSlots from "./pages/ManageSlots";
import EditSlot from "./pages/EditSlot";
import ManageAnnouncements from "./pages/ManageAnnouncements";
import ManageEvent from "./pages/ManageEvent";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import ManageUsers from "./pages/ManageUsers";

function App(){

  const [slots, setSlots] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [event, setEvent] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchInitialDetails(){
      try{
      const token = localStorage.getItem("token");

      const [eventResponse, slotsResponse, announcementsResponse, usersRespponse] =
        await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/event`, {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          }),

          fetch(`${import.meta.env.VITE_API_URL}/slots`, {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          }),

          fetch(`${import.meta.env.VITE_API_URL}/announcements`, {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          }),

          fetch(`${import.meta.env.VITE_API_URL}/users`, {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          })
        ]);
      
      if (!eventResponse.ok || !slotsResponse.ok || !announcementsResponse.ok || !usersRespponse) {
        throw new Error("Failed to fetch initial details!");
      }

      const eventData = await eventResponse.json();
      const slotsData = await slotsResponse.json();
      const announcementsData = await announcementsResponse.json();
      const usersData = await usersRespponse.json();

      setEvent(eventData);
      setSlots(slotsData);
      setAnnouncements(announcementsData);
      setUsers(usersData);
      }
      catch (err) {
        alert(err.message);
      }
    }

    fetchInitialDetails();

  }, []);

  async function handleDeleteSlot(id){
    const slotToDelete = slots.find((slot) => slot._id === id);
    
    if(!slotToDelete){
      alert("Slot not found!");
      return;
    }
    
    const newAnnouncement = {
      type: "system",
      message: `Slot "${slotToDelete.title}" has been deleted!`
    };

    try{
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_API_URL}/slots/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      if(!response.ok){
        throw new Error(data.message || "Failed to Delete the slot");
      }

      setSlots((prevSlots) => prevSlots.filter((slot) => slot._id !== id));

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
    }
    catch (err) {
      alert(err.message);
    }

  }

  return(
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />} >
          <Route element={<MainLayout />} >
            <Route path="/manage-slots" element={<ManageSlots slots={slots} setSlots={setSlots} handleDeleteSlot={handleDeleteSlot}
            announcements={announcements} setAnnouncements={setAnnouncements}/>} />
            <Route path="/dashboard" element={<Dashboard slots={slots} event={event} />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/announcements" element={<Announcements announcements={announcements} />} />
            <Route path="/manage-announcements" element={<ManageAnnouncements announcements={announcements} setAnnouncements={setAnnouncements}/>} />
            <Route path="/slotdetails/:id" element={<SlotDetails slots={slots} />} />
            <Route path="/edit-slot/:id" element={<EditSlot slots={slots} setSlots={setSlots} announcements={announcements} setAnnouncements={setAnnouncements}/>} />
            <Route path="/manage-users" element={<ManageUsers users={users} setUsers={setUsers}/>} />
            <Route path="/manage-event" 
              element={ event.length > 0 
                ? <ManageEvent event={event} setEvent={setEvent} announcements={announcements} setAnnouncements={setAnnouncements}/>
                : <p className="empty-message">No any event yet...</p>
              } 
            />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
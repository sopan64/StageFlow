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
import initialevent from "./data/events";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

function App(){

  const [slots, setSlots] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [event, setEvent] = useState(initialevent);

  useEffect(() => {
    async function fetchInitialDetails(){

      const slotsResponse = await fetch("http://localhost:5000/slots");
      const announcementsResponse = await fetch("http://localhost:5000/announcements");
      const slotsData = await slotsResponse.json();
      const announcementsData = await announcementsResponse.json();

      setSlots(slotsData);
      setAnnouncements(announcementsData)
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
      const response = await fetch(`http://localhost:5000/slots/${id}`, {
        method: "DELETE"
      });

      if(!response.ok){
        throw new Error("Failed to Delete the slot");
      }

      setSlots((prevSlots) => prevSlots.filter((slot) => slot._id !== id));

      const announcementsResponse = await fetch("http://localhost:5000/announcements", {
        method: "POST",
        headers:{
          "content-Type": "application/json"
        },
        body: JSON.stringify(newAnnouncement)
      });

      if(!announcementsResponse.ok){
        throw new Error("Failed to create announcement!");
      }

      const announcementsData = await announcementsResponse.json();

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
            <Route path="/manage-event" element={<ManageEvent event={event} setEvent={setEvent}/>} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
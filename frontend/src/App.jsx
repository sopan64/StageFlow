import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import initialslots from "./data/slots"
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Attendance from "./pages/Attendance";
import MainLayout from "./layouts/MainLayout";
import Announcements from "./pages/Announcements";
import SlotDetails from "./pages/SlotDetails";
import ManageSlots from "./pages/ManageSlots";
import EditSlot from "./pages/EditSlot";
import initialAnnouncements from "./data/announcements";
import ManageAnnouncements from "./pages/ManageAnnouncements";
import ManageEvent from "./pages/ManageEvent";
import initialevent from "./data/events";

function App(){

  const [slots, setSlots] = useState(initialslots);
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [event, setEvent] = useState(initialevent);

  function handleDeleteSlot(id){
    const slotToDelete = slots.find((slot) => slot.id === id);

    const newAnnouncement = {
      id: Date.now(),
      type: "system",
      message: `Slot "${slotToDelete.name}" has been deleted!`,
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })
    };

    setAnnouncements((prevAnnouncements) => [
      newAnnouncement,
      ...prevAnnouncements
    ]);

    setSlots(
      slots.filter(
        (slot) => slot.id !== id
      )
    );
  }

  return(
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
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

      </Routes>
    </BrowserRouter>
  );
}

export default App;
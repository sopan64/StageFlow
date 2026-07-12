import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import initialslots from "./data/slots"
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MySlots from "./pages/MySlots";
import Attendance from "./pages/Attendance";
import MainLayout from "./layouts/MainLayout";
import Announcements from "./pages/Announcements";
import SlotDetails from "./pages/SlotDetails";
import Admin from "./pages/Admin";
import EditSlot from "./pages/EditSlot";

function App(){

  const [slots, setSlots] = useState(initialslots);

  function handleDeleteSlot(id){
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

          <Route path="/admin" element={<Admin slots={slots} setSlots={setSlots}/>} />
          <Route path="/dashboard" element={<Dashboard slots={slots} handleDeleteSlot={handleDeleteSlot}/>} />
          <Route path="/myslots" element={<MySlots />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/slotdetails/:id" element={<SlotDetails slots={slots} />} />
          <Route path="/edit-slot/:id" element={<EditSlot slots={slots} setSlots={setSlots}/>} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
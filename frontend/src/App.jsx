import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { useToast } from "./context/ToastContext";
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
  const [connectionStatus, setConnectionStatus] = useState("idle");
  const [retryTrigger, setRetryTrigger] = useState(0);
  const { showToast } = useToast();

  useEffect(() => {
    let cancelled = false;
    const MAX_ATTEMPTS = 5;

    function sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async function fetchInitialDetails(attempt = 1){
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      if (attempt === 1) {
        setConnectionStatus("idle");
      }

      try{
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

      if (cancelled) return;

      setEvent(eventData);
      setSlots(slotsData);
      setAnnouncements(announcementsData);
      setUsers(usersData);
      setConnectionStatus("idle");
      }
      catch (err) {
        if (cancelled) return;

        if (attempt < MAX_ATTEMPTS) {
          setConnectionStatus("retrying");
          const delay = Math.min(3000 * attempt, 10000);
          await sleep(delay);
          if (cancelled) return;
          return fetchInitialDetails(attempt + 1);
        }

        setConnectionStatus("failed");
      }
    }

    fetchInitialDetails();

    return () => {
      cancelled = true;
    };

  }, [retryTrigger]);

  async function handleDeleteSlot(id){
    const slotToDelete = slots.find((slot) => slot._id === id);
    
    if(!slotToDelete){
      showToast("Slot not found!", "error");
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
      showToast(err.message, "error");
    }

  }

  return(
    <>
      {connectionStatus === "retrying" && (
        <div className="connection-banner connection-banner-retrying">
          Connecting to server... this can take up to a minute if it's been idle.
        </div>
      )}

      {connectionStatus === "failed" && (
        <div className="connection-banner connection-banner-failed">
          Couldn't reach the server.
          <button onClick={() => setRetryTrigger((n) => n + 1)}>Retry</button>
        </div>
      )}

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
    </>
  );
}

export default App;
console.log("Dashboard Rendered");
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MySlots from "./pages/MySlots";
import Attendance from "./pages/Attendance";
import MainLayout from "./layouts/MainLayout";
import Announcements from "./pages/Announcements";
import SlotDetails from "./pages/SlotDetails";

function App(){
  return(
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route element={<MainLayout />} >

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/myslots" element={<MySlots />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/slotdetails/:id" element={<SlotDetails />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
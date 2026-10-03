import { useEffect, useState } from "react";
import Button from "../components/Button";
import { useToast } from "../context/ToastContext";

function ManageSlotBookings({ slots }) {

    const user = JSON.parse(localStorage.getItem("user"));

    const mySlots = slots.filter(
        (slot) => slot.coordinator?._id === user.id
    );

    const [bookings, setBookings] = useState([]);
    const [times, setTimes] = useState({});
    const { showToast } = useToast();

    useEffect(() => {

        async function fetchBookings() {

            const token = localStorage.getItem("token");

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/slot-bookings`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                console.error(
                    data.message || "Failed to fetch bookings!"
                );
                return;
            }

            setBookings(data);
        }

        fetchBookings();

    }, []);

    async function handleBook(slot) {
    const time = times[slot._id];

    if (!time?.startTime || !time?.endTime) {
        showToast("Please select both start and end time!", "error");
        return;
    }

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/slot-bookings`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                slotId: slot._id,
                startTime: time.startTime,
                endTime: time.endTime
            })
        }
    );

    const data = await response.json();

    if (!response.ok) {
        showToast(data.message || "Failed to book slot!", "error");
        return;
    }

    setBookings((prev) => [...prev, data.booking]);
    showToast("Slot booked successfully!", "success");

    setTimes((prev) => ({
        ...prev,
        [slot._id]: {
            startTime: "",
            endTime: ""
        }
    }));
}

    return (
        <div>

            <h2>Manage Slot Bookings</h2>

            {mySlots.map((slot) => {

                const booking = bookings.find(
                    (booking) => booking.slot?._id === slot._id
                );

                return (
                    <div key={slot._id}>

                        <h3>{slot.title}</h3>

                        {booking ? (
                            <p>
                                {booking.startTime} - {booking.endTime}
                            </p>
                        ) : (
<div>
    <p>Not booked for today</p>

    <label>Start Time</label>
    <input
        type="time"
        value={times[slot._id]?.startTime || ""}
        onChange={(e) =>
            setTimes((prev) => ({
                ...prev,
                [slot._id]: {
                    ...prev[slot._id],
                    startTime: e.target.value
                }
            }))
        }
    />

    <label>End Time</label>
    <input
        type="time"
        value={times[slot._id]?.endTime || ""}
        onChange={(e) =>
            setTimes((prev) => ({
                ...prev,
                [slot._id]: {
                    ...prev[slot._id],
                    endTime: e.target.value
                }
            }))
        }
    />

    <Button text="Book Slot" onClick={() => handleBook}/>
</div>
                        )}

                    </div>
                );
            })}

        </div>
    );
}

export default ManageSlotBookings;
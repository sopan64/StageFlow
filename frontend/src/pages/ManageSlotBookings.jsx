import { useEffect, useState } from "react";
import Button from "../components/Button";
import { useToast } from "../context/ToastContext";
import "../styles/ManageSlotBookings.css";

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

async function handleDelete(booking) {
    const token = localStorage.getItem("token");

    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/slot-bookings/${booking._id}`,
        {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        showToast(data.message || "Failed to cancel booking!", "error");
        return;
    }

    setBookings((prev) =>
        prev.filter((item) => item._id !== booking._id)
    );

    showToast("Booking cancelled!", "success");
}

return (
    <div className="slot-bookings-page">

        <h2>Manage Slot Bookings</h2>

        <h3 className="my-slots-heading">My Slots</h3>

        <div className="slot-bookings-grid">

            {mySlots.map((slot) => {

                const booking = bookings.find(
                    (booking) => 
                        booking.slot?._id === slot._id ||
                        booking.slot === slot._id
                );

                return (
                    <div
                        className="slot-booking-card"
                        key={slot._id}
                    >

                        <h3 className="slot-booking-title">
                            {slot.title}
                        </h3>

                        {booking ? (

                            <div className="booking-info">

                                <p className="booking-status">
                                    Booked for today
                                </p>

                                <p className="booking-time">
                                    {booking.startTime} - {booking.endTime}
                                </p>

                                <Button
                                    text="Cancel Booking"
                                    className="red-button"
                                    onClick={() => handleDelete(booking)}
                                />

                            </div>

                        ) : (

                            <div className="booking-form">

                                <p className="booking-status">
                                    Not booked for today
                                </p>

                                <div className="time-field">

                                    <label>Start Time</label>

                                    <input
                                        type="time"
                                        value={
                                            times[slot._id]?.startTime || ""
                                        }
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

                                </div>

                                <div className="time-field">

                                    <label>End Time</label>

                                    <input
                                        type="time"
                                        value={
                                            times[slot._id]?.endTime || ""
                                        }
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

                                </div>

                                <Button
                                    text="Book Slot"
                                    onClick={() => handleBook(slot)}
                                />

                            </div>

                        )}

                    </div>
                );
            })}

        </div>

<div className="today-bookings">
    <h3>Today's Bookings</h3>

    <p className="booking-schedule-label">
        Already booked slot timings
    </p>

    {bookings.length === 0 ? (
        <p className="no-bookings">
            No slots have been booked for today.
        </p>
    ) : (
        <div className="today-bookings-list">

            {bookings.map((booking) => (
                <div
                    className="today-booking-item"
                    key={booking._id}
                >
                    <span className="today-booking-title">
                        {booking.slot?.title}
                    </span>

                    <span className="today-booking-time">
                        {booking.startTime} - {booking.endTime}
                    </span>
                </div>
            ))}

        </div>
    )}
</div>

    </div>
);
}

export default ManageSlotBookings;
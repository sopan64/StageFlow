import { useState, useEffect } from "react";

function ManageSlotBookings ({ slots }) {

    const user = JSON.parse(localStorage.getItem("user"));

    const mySlots = slots.filter(
        (slot) => slot.coordinator?._id === user.id
    );

    const [bookings, setBookings] = useState([]);

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
                console.error(data.message || "Failed to fetch bookings!");
                return;
            }

            setBookings(data);
        }

        fetchBookings();
    }, []);

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
                    <p>Not booked for today</p>
                )}
            </div>
        );
    })}
</div>
    );
}

export default ManageSlotBookings;
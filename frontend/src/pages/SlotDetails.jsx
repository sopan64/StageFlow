import { useParams } from "react-router-dom";

function SlotDetails(){
    const slots = [
    {
        id: 1,
        name: "Acoustic Band",
        coordinator: "Rahul",
        time: "5:00 PM",
        members: 6
    },
    {
        id: 2,
        name: "Final Performance",
        coordinator: "Priya",
        time: "7:00 PM",
        members: 10
    },
    {
        id: 3,
        name: "Opening Ceremony",
        coordinator: "Aman",
        time: "4:00 PM",
        members: 8
    }
    ];
    const { id } = useParams();

    const slot = slots.find(
        (slot) => slot.id === Number(id)
    );
    
    if(!slot){
        return <h2>Slot not found!</h2>;
    }

    return (
        <>
            <h1>Slot Details</h1>
            <h2>{slot.name}</h2>
            <p>Coordinator: {slot.coordinator}</p>
            <p>Time: {slot.time}</p>
            <p>Members: {slot.members}</p>
        </>
    );
}
export default SlotDetails;
import "../styles/UpdatesCard.css";

function UpdatesCard({ updates }){
    return (
        <div className="updates-card">
            <h2>Latest Updates</h2>
            {
                updates.map((update) => (
                    <p>{update}</p>
                ))
            }
        </div>
    );
}
export default UpdatesCard;
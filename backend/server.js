const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Hello from SageFlow Backend!");
});

app.get("/event", (req, res) => {
    res.json({
        name: "Annual Night",
        date: "25 jul 2026",
        venue: "VNIT Nagpur"
    });
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});

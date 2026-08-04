require("dotenv").config();

const express = require("express");

const slotsRouter = require("./routes/slots");
const announcementsRouter = require("./routes/announcements");
const eventRouter = require("./routes/event");
const userRouter = require("./routes/users");

const cors = require("cors");

const app = express();

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
})
.then(() => {
    console.log("✅ Connected");
})
.catch((err) => {
    console.log(err.name);
    console.log(err.message);
    console.log(err);
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello from SageFlow Backend!");
});

app.use("/slots", slotsRouter);

app.use("/announcements", announcementsRouter);

app.use("/event", eventRouter);

app.use("/users", userRouter);

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});

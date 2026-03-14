const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/taskmanager", {
    useNewUrlParser: true, // Add this line to use the new URL parser
    useUnifiedTopology: true // Add this line to use the new Server Discover and Monitoring engine
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});

app.use("/api", taskRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
const express = require("express");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//Routes
app.use("/tasks", taskRoutes);
app.use("/auth", authRoutes);

//test Roure
app.get("/test", (req, res) =>{
    res.send("Server is running Successfully !");
});

module.exports = app;
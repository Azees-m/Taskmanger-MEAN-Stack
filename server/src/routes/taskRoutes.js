const express = require("express");
const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware")

const router = express.Router();

//POST
router.post("/", authMiddleware, async (req, res) => {
  try{
    const { title, description, priority, status , dueDate } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
      }

      const newTask = new Task({
        title,
        description,
        priority,
        status,
        dueDate,
        userId: req.userId,
      });

      const savedTask = await newTask.save();
        res.status(201).json(savedTask);
  }
  catch(error){
    res.status(500).json({ message: "failed to create Task", error});
  }
});

//GET
router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;

    // 🔥 query params
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const status = req.query.status;
    const priority = req.query.priority;

    const skip = (page - 1) * limit;

    // 🔥 filter object
    let filter = { userId };

    if (status) {
      filter.status = status;
    }

    if (priority) {
      filter.priority = priority;
    }

    // 🔥 fetch tasks
    const tasks = await Task.find(filter)
      .sort({ createdAt: -1 })   // latest first
      .skip(skip)
      .limit(limit);

    // 🔥 total count
    const total = await Task.countDocuments(filter);

    res.status(200).json({
      tasks,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks", error });
  }
});

//POST
router.put("/:id", authMiddleware, async (req, res) =>{
  try{
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if(!updatedTask){
      return res.status(404).json({ message: "Task not Found"});
    }
    res.status(200).json(updatedTask);
  }
  catch(error){
    res.status(500).json({ message: "Failed to update Task", error });
  }
});

//DELETE
router.delete("/:id", authMiddleware, async (req, res) => {
  try{
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if(!deletedTask){
      return res.status(404).json({ message: "Task not Found"});
    }
    res.status(200).json({ message: "Task Deleted Sucessfully"});
  }
  catch (error) {
  res.status(500).json({ message: "Failed to Delete Task", error });
}

});

module.exports = router;  

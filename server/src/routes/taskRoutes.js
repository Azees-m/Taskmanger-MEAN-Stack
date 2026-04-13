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
  try{
    const tasks = await Task.find({ userId: req.userId});
    res.status(200).json(tasks);
  }
  catch(error){
    res.status(500).json({ message: "Falied to fetch Tasks", error});
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

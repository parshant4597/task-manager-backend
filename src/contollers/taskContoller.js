const Task = require("../models/task");

// CREATE TASK
const createTask = async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      userId: req.user._id
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
 
// GET ALL TASKS WITH FILTERS (INCLUDING OVERDUE)
const getTasks = async (req, res) => {
  try {
    const { status, priority, category, search, overdue } = req.query;

    const filter = { userId: req.user._id };

    if (priority) filter.priority = priority;
    if (category) filter.category = category;

    // STATUS & OVERDUE LOGIC (FIXED)
    if (overdue === "true") {
      filter.dueDate = { $lt: new Date() };

      // if status already provided, respect it
      if (status) {
        filter.status = status;
      } else {
        filter.status = { $ne: "Completed" };
      }
    } else if (status) {
      filter.status = status;
    }

    // SEARCH
    if (search) {
      filter.title = { $regex: search.trim(), $options: "i" };
    }

    const tasks = await Task.find(filter).sort({ createdAt: -1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET SINGLE TASK
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE TASK
const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE TASK
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 
// TASK STATISTICS (with overdue)
const getTaskStats = async (req, res) => {
  try {
    const userId = req.user._id;
    const now = new Date();

    const total = await Task.countDocuments({ userId });

    const pending = await Task.countDocuments({
      userId,
      status: "Pending"
    });

    const inProgress = await Task.countDocuments({
      userId,
      status: "In Progress"
    });

    const completed = await Task.countDocuments({
      userId,
      status: "Completed"
    });

    const overdue = await Task.countDocuments({
      userId,
      dueDate: { $lt: now },
      status: { $ne: "Completed" }
    });

    res.json({
      total,
      pending,
      inProgress,
      completed,
      overdue
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

 

// EXPORTS (at the end)
module.exports = {
  createTask,getTaskStats,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
};

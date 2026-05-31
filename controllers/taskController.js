import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      priority,
      assignee,
      dueDate,
    } = req.body;

    const task = await Task.create({
      title,
      description,
      priority,
      assignee,
      dueDate,

      createdBy: req.user.id,
      organizationId: req.user.organizationId,
    });

    res.status(201).json({
      success: true,
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getTasks = async (req, res) => {
    try {
      const {
        page = 1,
        limit = 10,
        status,
        priority,
        assignee,
      } = req.query;
  
      const filter = {};
  
      if (status) {
        filter.status = status;
      }
  
      if (priority) {
        filter.priority = priority;
      }
  
      if (assignee) {
        filter.assignee = assignee;
      }
  
      const tasks = await Task.find(filter)
        .skip((page - 1) * limit)
        .limit(Number(limit))
        .populate("assignee", "name email");
  
      res.status(200).json({
        success: true,
        count: tasks.length,
        tasks,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

  export const getTaskById = async (req, res) => {
    try {
      const task = await Task.findById(
        req.params.id
      ).populate(
        "assignee",
        "name email"
      );
  
      if (!task) {
        return res.status(404).json({
          message: "Task not found",
        });
      }
  
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

  export const updateTask = async (req, res) => {
    try {
      const task = await Task.findById(
        req.params.id
      );
  
      if (!task) {
        return res.status(404).json({
          message: "Task not found",
        });
      }
  
      const updatedTask =
        await Task.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        );
  
      res.status(200).json(updatedTask);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

  export const deleteTask = async (
    req,
    res
  ) => {
    try {
      const task = await Task.findById(
        req.params.id
      );
  
      if (!task) {
        return res.status(404).json({
          message: "Task not found",
        });
      }
  
      await task.deleteOne();
  
      res.status(200).json({
        message:
          "Task deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
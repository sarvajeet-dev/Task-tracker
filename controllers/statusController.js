import Task from "../models/Task.js";

const transitions = {
  TODO: ["IN_PROGRESS", "BLOCKED"],

  IN_PROGRESS: [
    "IN_REVIEW",
    "BLOCKED",
  ],

  IN_REVIEW: [
    "DONE",
    "BLOCKED",
  ],

  DONE: [],

  BLOCKED: [],
};

export const updateTaskStatus = async (
  req,
  res
) => {
  try {
    const { status } = req.body;

    const task = await Task.findById(
      req.params.id
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // Only assignee or manager
    const isAssignee =
      task.assignee?.toString() ===
      req.user.id;

    const isManager =
      req.user.role === "MANAGER";

    if (!isAssignee && !isManager) {
      return res.status(403).json({
        message:
          "Only assignee or manager can update status",
      });
    }

    const allowedTransitions =
      transitions[task.status];

    if (
      !allowedTransitions.includes(
        status
      )
    ) {
      return res.status(400).json({
        message: `Cannot move from ${task.status} to ${status}`,
      });
    }

    task.status = status;

    await task.save();

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
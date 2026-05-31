import express from "express";

import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

import auth from "../middleware/auth.js";
import authorize from "../middleware/authorize.js";
import validate from "../middleware/validate.js";

import {
  taskSchema,
} from "../validations/task.validation.js";

const router = express.Router();

router.post(
  "/",
  auth,
  authorize("ADMIN", "MANAGER"),
  validate(taskSchema),
  createTask
);

router.get("/", auth, getTasks);

router.get("/:id", auth, getTaskById);

router.put(
  "/:id",
  auth,
  authorize("ADMIN", "MANAGER"),
  updateTask
);

router.delete(
  "/:id",
  auth,
  authorize("ADMIN"),
  deleteTask
);

export default router;
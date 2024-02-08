import express from "express";
import { authenticationHandler } from "../middlewares/authentication";
import { validationHandler } from "../middlewares/validation";
import { taskSchema } from "../models/task";
import {
  getTasks,
  getTaskById,
  deleteTask,
  postNewTask,
} from "../services/task-service";
import { ApiError } from "../middlewares/error";

export const taskRouter = express.Router();

taskRouter.get("/:listId", authenticationHandler, async (req, res) => {
  try {
    const listId = req.params["listId"];
    const tasks = await getTasks(listId);
    res.status(200).json({ ok: true, data: tasks });
    res.status;
  } catch (error) {
    res.status(500).send("Error al obtener los tasks");
  }
});

taskRouter.post(
  "/:listId",
  authenticationHandler,
  validationHandler(taskSchema),
  async (req, res, next) => {
    try {
      const userId = req.userId!;
      const listId = req.params["listId"];
      const task = await postNewTask(req.body, listId, userId);
      res.status(201).json({ ok: true, data: task });
    } catch (error) {
      next(error);
    }
  }
);

taskRouter.delete("/:listId", authenticationHandler, async (req, res, next) => {
  try {
    const listId = req.params["listId"];
    const userId = req.userId!;
    const task = await getTaskById(listId);
    if (task.rowCount === 0) {
      return next(new ApiError("Board no encontrado.", 401));
    }
    await deleteTask(listId, userId);
    res.status(200).json({
      ok: true,
    });
  } catch (error) {
    next(error);
  }
});

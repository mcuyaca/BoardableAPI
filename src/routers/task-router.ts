import express from "express";
import { authenticationHandler } from "../middlewares/authentication";
import { validationHandler } from "../middlewares/validation";
import { taskSchema } from "../models/task";
import { getTasks, deleteTask, postNewTask } from "../services/task-service";
import { editTask } from "../data/task-data";

export const taskRouter = express.Router();

taskRouter.get("/", authenticationHandler, async (req, res) => {
  try {
    const tasks = await getTasks();
    res.status(200).json({ ok: true, data: tasks });
    res.status;
  } catch (error) {
    res.status(500).send("Error al obtener los tasks");
  }
});

// taskRouter.get("/:listId", authenticationHandler, async (req, res) => {
//   try {
//     const listId = req.params["listId"];
//     const tasks = await getTasks(listId);
//     res.status(200).json({ ok: true, data: tasks });
//     res.status;
//   } catch (error) {
//     res.status(500).send("Error al obtener los tasks");
//   }
// });

taskRouter.post(
  "/:boardId",
  authenticationHandler,
  validationHandler(taskSchema),
  async (req, res, next) => {
    try {
      const userId = req.userId!;
      const boardId = req.params["boardId"];
      const task = await postNewTask(req.body, userId, boardId);
      res.status(201).json({ ok: true, data: task });
    } catch (error) {
      next(error);
    }
  }
);

// taskRouter.post(
//   "/:listId",
//   authenticationHandler,
//   validationHandler(taskSchema),
//   async (req, res, next) => {
//     try {
//       const userId = req.userId!;
//       const listId = req.params["listId"];
//       const task = await postNewTask(req.body, listId, userId);
//       res.status(201).json({ ok: true, data: task });
//     } catch (error) {
//       next(error);
//     }
//   }
// );

taskRouter.patch("/", authenticationHandler, async (req, res, next) => {
  try {
    const userId = req.userId!;
    const data = req.body;
    console.log(data);
    const newTask = await editTask(data.id, data.content, userId);
    console.log(newTask);
    res.status(200).json({
      ok: true,
      data: newTask,
    });
  } catch (error) {
    next(error);
  }
});

taskRouter.delete("/", authenticationHandler, async (req, res, next) => {
  try {
    const userId = req.userId!;
    console.log(req.body);
    await deleteTask(req.body.taskId, userId);
    res.status(200).json({
      ok: true,
    });
  } catch (error) {
    next(error);
  }
});

// taskRouter.delete("/:listId", authenticationHandler, async (req, res, next) => {
//   try {
//     const listId = req.params["listId"];
//     const userId = req.userId!;
//     const task = await getTaskById(listId);
//     if (task.rowCount === 0) {
//       return next(new ApiError("Board no encontrado.", 401));
//     }
//     await deleteTask(listId, userId);
//     res.status(200).json({
//       ok: true,
//     });
//   } catch (error) {
//     next(error);
//   }
// });

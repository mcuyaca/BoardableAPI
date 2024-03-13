import express from "express";
import { authenticationHandler } from "../middlewares/authentication";
import { validationHandler } from "../middlewares/validation";
import { listSchema } from "../models/list";
import {
  getLists,
  getListById,
  deleteList,
  postNewList,
  editList,
} from "../services/list-service";
import { ApiError } from "../middlewares/error";
import { ediTask } from "../services/task-service";

export const listRouter = express.Router();

listRouter.get("/", authenticationHandler, async (req, res) => {
  try {
    const userId = req.userId!;
    const lists = await getLists(userId);
    res.status(200).json({ ok: true, data: lists });
    res.status;
  } catch (error) {
    res.status(500).send("Error al obtener la lista de tasks");
  }
});

listRouter.post(
  "/",
  authenticationHandler,
  validationHandler(listSchema),
  async (req, res, next) => {
    try {
      const userId = req.userId!;
      const list = await postNewList(req.body, userId);
      res.status(201).json({ ok: true, data: list });
    } catch (error) {
      next(error);
    }
  }
);

listRouter.patch("/:listId", authenticationHandler, async (req, res, next) => {
  try {
    const listId = req.params["listId"];
    const userId = req.userId!;
    const list = await getListById(listId);
    if (list.rowCount === 0) {
      return next(new ApiError("List no encontrada.", 401));
    }
    const newTitle = req.body.tilte as string;
    const editedList = await editList(listId, newTitle, userId);
    res.status(200).json({
      ok: true,
      data: editedList,
    });
  } catch (error) {
    next(error);
  }
});

listRouter.delete("/:listId", authenticationHandler, async (req, res, next) => {
  try {
    const listId = req.params["listId"];
    const userId = req.userId!;
    const list = await getListById(listId);
    if (list.rowCount === 0) {
      return next(new ApiError("List no encontrada.", 401));
    }
    await deleteList(listId, userId);
    res.status(200).json({
      ok: true,
    });
  } catch (error) {
    next(error);
  }
});

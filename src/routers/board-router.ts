import express from "express";
import { authenticationHandler } from "../middlewares/authentication";
import { validationHandler } from "../middlewares/validation";
import { boardSchema } from "../models/board";
import {
  getBoards,
  getBoardById,
  deleteBoard,
  postNewBoard,
  editBoard,
} from "../services/board-service";
import { ApiError } from "../middlewares/error";

export const boardRouter = express.Router();

boardRouter.get("/", authenticationHandler, async (req, res) => {
  try {
    const userId = req.userId!;
    const boards = await getBoards(userId);
    res.status(200).json({ ok: true, data: boards });
    res.status;
  } catch (error) {
    res.status(500).send("Error al obtener los boards");
  }
});

boardRouter.post(
  "/",
  authenticationHandler,
  validationHandler(boardSchema),
  async (req, res, next) => {
    try {
      const userId = req.userId!;
      const board = await postNewBoard(req.body, userId);
      res.status(201).json({ ok: true, data: board });
    } catch (error) {
      next(error);
    }
  }
);

boardRouter.patch(
  "/:boardId",
  authenticationHandler,
  validationHandler(boardSchema),
  async (req, res, next) => {
    try {
      const boardId = req.params["boardId"];
      const userId = req.userId!;
      const board = await editBoard(req.body, boardId, userId);
      res.status(201).json({ ok: true, data: board });
    } catch (error) {
      next(error);
    }
  }
);

boardRouter.delete(
  "/:boardId",
  authenticationHandler,
  async (req, res, next) => {
    try {
      const boardId = req.params["boardId"];
      const userId = req.userId!;
      const board = await getBoardById(boardId);
      if (board.rowCount === 0) {
        return next(new ApiError("Board no encontrado.", 401));
      }
      await deleteBoard(boardId, userId);
      res.status(200).json({
        ok: true,
      });
    } catch (error) {
      next(error);
    }
  }
);

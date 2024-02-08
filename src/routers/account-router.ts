import express from "express";
import { authenticationHandler } from "../middlewares/authentication";
import {
  deleteAccount,
  editAccount,
  getAccountById,
} from "../services/account-service";

export const accountRouter = express.Router();

accountRouter.get("/", authenticationHandler, async (req, res, next) => {
  try {
    const userId = req.userId!;
    const account = await getAccountById(userId);
    res.status(200).json({
      ok: true,
      data: account,
    });
  } catch (error) {
    next(error);
  }
});
accountRouter.patch("/", authenticationHandler, async (req, res, next) => {
  try {
    const userId = req.userId!;
    const data = req.body;

    const newAccount = await editAccount(data, userId);

    res.status(200).json({
      ok: true,
      data: newAccount,
    });
  } catch (error) {
    next(error);
  }
});
accountRouter.delete("/", authenticationHandler, async (req, res, next) => {
  try {
    const userId = req.userId!;
    await deleteAccount(userId);
    res.status(200).json({ ok: true });
  } catch (error) {
    next(error);
  }
});

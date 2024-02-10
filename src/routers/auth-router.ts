import express from "express";
import { createUser, validateCredentials } from "../services/auth-service";
import { validationHandler } from "../middlewares/validation";
import { userSchema } from "../models/user";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../utils/const-util";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  validationHandler(userSchema),
  async (req, res, next) => {
    try {
      const userData = await createUser(req.body);
      res.status(201).json({
        ok: true,
        data: userData,
      });
    } catch (error) {
      next(error);
    }
  }
);

authRouter.post("/login", async (req, res, next) => {
  try {
    const user = await validateCredentials(req.body);
    const payload = { userId: user.id, userRole: user.role };
    const token = jwt.sign(payload, jwtSecret, { expiresIn: "10h" });
    res.status(200).json({
      ok: true,
      token,
    });
  } catch (error) {
    next(error);
  }
});

export default authRouter;

import express from "express";
import { getUsersCount } from "../controllers/getUsersCount.ts";
export const userRouter = express.Router();

userRouter.get("/count", getUsersCount);

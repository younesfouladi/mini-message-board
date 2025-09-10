import express from "express";
import { getUsersCount } from "../controllers/getUsersCount.ts";
export const userRouter = express.Router();
import { getUsers } from "../controllers/getUsers.ts";

userRouter.get("/", getUsers);
userRouter.get("/count", getUsersCount);

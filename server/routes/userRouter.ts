import express from "express";
import { getUsersCount } from "../controllers/getUsersCount.ts";
import { getUsers } from "../controllers/getUsers.ts";
import { addNewUser } from "../controllers/addNewUser.ts";

export const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.get("/count", getUsersCount);
userRouter.post("/add", addNewUser);

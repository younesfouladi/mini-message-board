import express from "express";
import { getUsersCount } from "../controllers/getUsersCount.ts";
import { getUsers } from "../controllers/getUsers.ts";
import { createNewUser } from "../controllers/createNewUser.ts";
import { getUserMessagesCount } from "../controllers/getUserMessagesCount.ts";

export const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.get("/count", getUsersCount);
userRouter.post("/new", createNewUser);
userRouter.get("/:id/count", getUserMessagesCount);

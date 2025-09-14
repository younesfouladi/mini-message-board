import express from "express";
import { getUsersCount } from "../controllers/getUsersCount.js";
import { getUsers } from "../controllers/getUsers.js";
import { createNewUser } from "../controllers/createNewUser.js";
import { getUserMessagesCount } from "../controllers/getUserMessagesCount.js";

export const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.get("/count", getUsersCount);
userRouter.post("/new", createNewUser);
userRouter.get("/:id/count", getUserMessagesCount);

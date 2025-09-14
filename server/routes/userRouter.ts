import express from "express";
import { getUsersCount } from "../controllers/getUsersCount";
import { getUsers } from "../controllers/getUsers";
import { createNewUser } from "../controllers/createNewUser";

export const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.get("/count", getUsersCount);
userRouter.post("/new", createNewUser);
userRouter.get("/:id/count", getUserMessagesCount);

import express from "express";
import { getMessages } from "../controllers/getMessages";
import { getMessagesCount } from "../controllers/getMessagesCount";
import { addNewMessage } from "../controllers/addNewMessage";

export const messageRouter = express.Router();

messageRouter.post("/get", getMessages);

messageRouter.get("/count", getMessagesCount);

messageRouter.post("/new", addNewMessage);

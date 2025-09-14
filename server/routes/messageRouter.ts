import express from "express";
import { getMessages } from "../controllers/getMessages.js";
import { getMessagesCount } from "../controllers/getMessagesCount.js";
import { addNewMessage } from "../controllers/addNewMessage.js";

export const messageRouter = express.Router();

messageRouter.post("/get", getMessages);

messageRouter.get("/count", getMessagesCount);

messageRouter.post("/new", addNewMessage);

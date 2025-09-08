import express from "express";
import { getMessages } from "../controllers/getMessages.ts";
import { getMessagesCount } from "../controllers/getMessagesCount.ts";

export const messageRouter = express.Router();

messageRouter.get("/", getMessages);

messageRouter.get("/count", getMessagesCount);

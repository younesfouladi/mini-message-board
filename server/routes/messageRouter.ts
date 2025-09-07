import express from "express";
import { getMessages } from "../controllers/getMessages.ts";
import { error } from "console";

export const messageRouter = express.Router();

messageRouter.get("/", getMessages);

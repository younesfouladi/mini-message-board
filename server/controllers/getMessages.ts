import express from "express";
import type { Request, Response, NextFunction } from "express";
import fs from "fs/promises";
import path from "path";

type Imessage = [string, string];

interface Idata {
  name: string;
  messages: Imessage[];
}

type IDb = Record<string, Idata>;

interface ISortedMessage {
  userId: string;
  userName: string;
  text: string;
  time: string;
}

const __dirname = import.meta.dirname;
const DB_PATH = path.join(__dirname, "..", "models", "db.json");
const MSG_PATH = path.join(__dirname, "..", "models", "msg.json");

export async function getMessages(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const count = Number(req.query.count);
    const db = await fs.readFile(MSG_PATH, "utf-8");
    const data: IDb = JSON.parse(db);

    res.json(Object.entries(data).slice(-count));
  } catch (err) {
    console.error("ERROR READING DB FILE", err);
    next(err);
  }
}

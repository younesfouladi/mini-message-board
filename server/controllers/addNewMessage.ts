import type { NextFunction, Request, Response } from "express";
import path from "path";
import fs from "fs/promises";

const __dirname = import.meta.dirname;
const DB_PATH = path.join(__dirname, "..", "models", "db.json");
const MSG_PATH = path.join(__dirname, "..", "models", "msg.json");

export const addNewMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, userName, text, time } = req.body;
    const db = await fs.readFile(DB_PATH, "utf-8");
    const msg = await fs.readFile(MSG_PATH, "utf-8");
    const dbJ = JSON.parse(db);
    const msgJ = JSON.parse(msg);

    if (userId in dbJ) {
      dbJ[userId].messages.push([text, time]);
      msgJ.push({ userId, userName, text, time });
      await fs.writeFile(DB_PATH, JSON.stringify(dbJ, null, 2));
      await fs.writeFile(MSG_PATH, JSON.stringify(msgJ, null, 2));
      res.json("ok");
    } else {
      return res.status(400).json({ error: "User doesn't exist" });
    }
  } catch (err) {
    next(err);
  }
};

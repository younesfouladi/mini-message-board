import type { NextFunction, Request, Response } from "express";
import path from "path";
import fs from "fs/promises";

type Idb = Record<string, { name: string; messages: string[] }>;

const __dirname = import.meta.dirname;
const DB_PATH = path.join(__dirname, "..", "models", "db.json");

export const getUserMessagesCount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: "User id is required" });
    }
    const d_b = await fs.readFile(DB_PATH, "utf-8");
    const db: Idb = JSON.parse(d_b);
    if (id in db) {
      res.json(db[id] ? db[id].messages.length : { error: "user not found" });
    }
  } catch (err) {
    next(err);
  }
};

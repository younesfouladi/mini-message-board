import type { NextFunction, Request, Response } from "express";
import path from "path";
import fs from "fs/promises";

const __dirname = import.meta.dirname;
const DB_PATH = path.join(__dirname, "..", "models", "db.json");

export const createNewUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, name } = req.body;
    const newUser = {
      name: name,
      messages: [],
    };
    const d_b = await fs.readFile(DB_PATH, "utf-8");
    const db = JSON.parse(d_b);

    if (id in db) {
      return res.status(400).json({ error: "User already exists" });
    } else {
      db[id] = newUser;
      await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));

      res.json("ok");
    }
  } catch (err) {
    next(err);
  }
};

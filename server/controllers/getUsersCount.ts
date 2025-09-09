import type { Request, Response, NextFunction } from "express";
import fs from "fs/promises";
import path from "path";

const __dirname = import.meta.dirname;
const DB_PATH = path.join(__dirname, "..", "models", "db.json");

export async function getUsersCount(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await fs.readFile(DB_PATH, "utf-8");
    const jsonData = JSON.parse(data);
    let count = 0;
    for (let id in jsonData) {
      count++;
    }
    res.json({ count: count });
  } catch (err) {
    console.error("ERROR READING DB FILE", err);
    next(err);
  }
}

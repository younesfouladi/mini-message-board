import type { Request, Response, NextFunction } from "express";
import fs from "fs/promises";
import path from "path";

const __dirname = import.meta.dirname;
const DB_PATH = path.join(__dirname, "..", "models", "db.json");

export async function getUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await fs.readFile(DB_PATH, "utf-8");
    const jsonData = JSON.parse(data);
    const result = [];
    for (let id in jsonData) {
      result.push({
        userId: id,
        userName: jsonData[id].name,
        messagesCount: jsonData[id].messages.length,
      });
    }
    res.json(result);
  } catch (err) {
    console.error("ERROR READING DB FILE", err);
    next(err);
  }
}

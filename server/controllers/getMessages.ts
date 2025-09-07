import express from "express";
import type { Request, Response, NextFunction } from "express";
import fs from "fs/promises";
import path from "path";

const __dirname = import.meta.dirname;
const DB_PATH = path.join(__dirname, "..", "models", "db.json");

export async function getMessages(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await fs.readFile(DB_PATH, "utf-8");
    res.json(JSON.parse(data));
  } catch (err) {
    console.error("ERROR READING DB FILE", err);
    next(err);
  }
}

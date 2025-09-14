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
      const index = findInsertIndex(msgJ, { userId, userName, text, time });
      msgJ.splice(index, 0, { userId, userName, text, time });

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

type Message = {
  userId: string;
  userName: string;
  text: string;
  time: string;
};

// Binary Search Algorithm
function findInsertIndex(arr: Message[], newMsg: Message) {
  let low = 0,
    high = arr.length;
  const newTime = new Date(newMsg.time);

  while (low < high) {
    let mid = Math.floor((low + high) / 2);
    if (new Date(arr[mid]!.time) < newTime) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return low;
}

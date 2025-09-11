import type { NextFunction, Request, Response } from "express";

export const addNewUser = (req: Request, res: Response, next: NextFunction) => {
  const userName = req.query.username;
  const userId = req.query.userid;
  res.json("ok");
  console.log(userName, userId);
};

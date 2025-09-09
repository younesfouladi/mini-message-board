import "dotenv/config";
import express from "express";
import cors from "cors";
import type {
  ErrorRequestHandler,
  Request,
  Response,
  NextFunction,
} from "express";
import { messageRouter } from "./routes/messageRouter.ts";
import { userRouter } from "./routes/userRouter.ts";

const port = process.env.PORT;
const app = express();

app.use(cors({ origin: process.env.CLIENT }));
app.use("/api/messages", messageRouter);
app.use("/api/users", userRouter);

app.listen(port, (err) => {
  if (err) console.log(`Server RUN Error : ${err}`);
  console.log(`Server is listening on PORT : ${port}`);
});

app.use(
  (
    err: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    res.status(500).send(`Something went wrong : ${err}`);
  }
);

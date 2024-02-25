import bodyParser from "body-parser";
import dotenv from "dotenv";
import express, { Application, NextFunction, Request, Response } from "express";
import { asyncHandler } from "node-async-handler";
import { ApiResponse } from "./api";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import { home, posts } from "./middlewares";

dotenv.config();
if (!process.env.PORT) throw new Error("Add PORT");
const port = process.env.PORT;

const app: Application = express();

app.use(bodyParser.json());

app.get("/", asyncHandler(home));
app.get("/posts/:id", asyncHandler(posts));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);

  const apiRes: ApiResponse<null> = {
    success: true,
    code: StatusCodes.INTERNAL_SERVER_ERROR,
    message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
    data: null
  };

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(apiRes);
});

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});

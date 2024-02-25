import { Request, Response } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import { ApiResponse, Post, apiCall } from "./api";

export const home = (req: Request, res: Response) => {
  const apiRes: ApiResponse<string> = {
    success: true,
    code: StatusCodes.OK,
    message: getReasonPhrase(StatusCodes.OK),
    data: "hello from express js"
  };

  res.status(StatusCodes.OK).json(apiRes).end();
};

export const post = (req: Request, res: Response) => {
  const id: string = req.params["id"];

  const data$ = apiCall(parseInt(id));
  data$.subscribe({
    next: (result: ApiResponse<Post>) =>
      res
        .status(result.code ?? StatusCodes.INTERNAL_SERVER_ERROR)
        .json(result)
        .end(),
    error: (err: Error) => console.error(`${err.name}: ${err.message}`)
  });
};

export const notFound = (req: Request, res: Response) => {
  const apiRes: ApiResponse<null> = {
    success: false,
    code: StatusCodes.NOT_FOUND,
    message: getReasonPhrase(StatusCodes.NOT_FOUND),
    data: null
  };

  res.status(StatusCodes.NOT_FOUND).json(apiRes).end();
};

import { Response } from "express";

export class AppError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number = 400) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const handleControllerError = (error: any, res: Response) => {
  const appError =
    error instanceof AppError
      ? error
      : new AppError("Internal Server Error", 500);
  handleError(appError.statusCode, appError.message, res);
};

export const handleError = (
  statusCode = 400,
  err: AppError | string,
  res: Response
) => {
  let message = "Erro interno do servidor";

  if (typeof err === "string") {
    message = err;
  } else {
    statusCode = err.statusCode;
    message = err.message;
  }

  return handleControllerError(
    typeof err === "string" ? new AppError(err, statusCode) : err,
    res
  );
};

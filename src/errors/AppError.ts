import { Response } from "express";

export class AppError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number = 400) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const handleError = (statusCode = 400 ,err: AppError | string, res: Response) => {
    let message = "Erro interno do servidor";

    if (typeof err === "string") {
        message = err;
    } else {
        statusCode = err.statusCode;
        message = err.message;
    }

    return res.status(statusCode).json({
        status: "error",
        statusCode,
        message
    });
};

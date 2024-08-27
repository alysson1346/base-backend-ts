import { Response } from "express";

export class AppError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number = 400) {
        super(message);
        this.statusCode = statusCode;
    }
}

// Função usada nos controladores
export const handleControllerError = (error: any, res: Response) => {
    const { statusCode, message } = formatError(error);
    console.error(error)
    return res.status(statusCode).json({ message });
};

// Função usada nos middlewares
export const handleError = (
    statusCode = 400,
    err: AppError | string,
    res: Response
) => {
    const { message } = formatError(err, statusCode);
    console.error(err)
   return res.status(statusCode).json({ message });
};

// Função de formatação interna usada por handleControllerError e handleError
const formatError = (
    error: AppError | string,
    defaultStatusCode: number = 500
): { statusCode: number, message: string } => {
    let statusCode = defaultStatusCode;
    let message = "Erro interno do servidor";

    if (typeof error === "string") {
        message = error;
    } else if (error instanceof AppError) {
        statusCode = error.statusCode;
        message = error.message;
    }

    return { statusCode, message };
};

// import { Response } from "express"

// export class AppError extends Error {

//     statusCode: number

//     constructor(message: string, statusCode: number = 400) {
//         super()
//         this.statusCode = statusCode
//         this.message = message
//     }
// }


// export const handleError = (err: AppError, res: Response) => {
//     const { statusCode, message } = err;

//     return res.status(statusCode).json({
//         // status: "error",
//         // statusCode,
//         message
//     })
// }

import { Response } from "express";

export class AppError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number = 400) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const handleError = (statusCode=400 ,err: AppError | string, res: Response) => {
    let message = "Erro interno do servidor";

    if (typeof err === "string") {
        // Se `err` for uma string, usamos essa string como a mensagem de erro
        message = err;
    } else {
        // Se `err` for uma instância de AppError, usamos suas propriedades
        statusCode = err.statusCode;
        message = err.message;
    }

    return res.status(statusCode).json({
        status: "error",
        statusCode,
        message
    });
};

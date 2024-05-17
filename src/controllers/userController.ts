import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { iLogin, iUserCreate } from "../interfaces/userInterface";
import { handleControllerError } from "../errors/AppError";
import { IEmailRequest } from "../interfaces/emailInterface";
import { sendEmail } from "../utils/sendEmail";
import { uploadImage, uploadImages } from "../utils/sendImage";
import { templateHtmlRegisterUser } from "../utils/templateEmails";
export class UserController {
  async index(req: Request, res: Response) {
    try {
      const userService = new UserService();
      const users = await userService.listUsers();

      return res.status(200).send({ data: users });
    } catch (error) {
      handleControllerError(error, res);
    }
  }

  async store(req: Request, res: Response) {
    try {
      const data: iUserCreate = req.body;
      const userService = new UserService();
      const newUser = await userService.createUser(data);

      return res.status(201).send({ data: newUser });
    } catch (error) {
      handleControllerError(error, res);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const data: iLogin = req.body;
      const userService = new UserService();
      const login = await userService.login(data);

      return res.status(201).send({ data: login });
    } catch (error) {
      handleControllerError(error, res);
    }
  }

  async sendEmail(req: Request, res: Response) {
    try {
      const test = templateHtmlRegisterUser("alysspb", "teydgdg");
      const text = test;
      const { subject, to }: IEmailRequest = req.body;
      await sendEmail({ subject, text, to });
      return res.json({
        message: "Email sended with success!",
      });
    } catch (error) {
      handleControllerError(error, res);
    }
  }

  async sendImage(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "Nenhuma imagem enviada",
        });
      }

      const folder = "perfis";
      const uploadOptions = { folder };

      const uploadResult = await uploadImage(req.file.path, uploadOptions);

      return res.json(uploadResult);
    } catch (error) {
      handleControllerError(error, res);
    }
  }

  async sendImages(req: Request, res: Response) {
    try {
      if (!req.files || !(req.files as Express.Multer.File[]).length) {
        return res.status(400).json({
          message: "Nenhuma imagem enviada",
        });
      }

      const folder = "perfis";
      const uploadOptions = { folder };

      const files = req.files as Express.Multer.File[];
      const filePaths = files.map((file) => file.path);

      const uploadResults = await uploadImages(filePaths, uploadOptions);

      return res.json(uploadResults);
    } catch (error) {
      handleControllerError(error, res);
    }
  }
}
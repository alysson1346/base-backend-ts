import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { iUserCreate } from "../interfaces/userInterface";
import { handleControllerError } from "../errors/AppError";
import { IEmailRequest } from "../interfaces/emailInterface";
import { sendEmail } from "../utils/sendEmail";
import { uploadImage, uploadImages } from "../utils/sendImage";
import { templateHtmlRegisterUser } from "../utils/templateEmails";
export class UserController {
  private userService = new UserService();
  
  constructor() {
    this.index = this.index.bind(this);
    this.store = this.store.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
    this.sendImage = this.sendImage.bind(this);
    this.sendImages = this.sendImages.bind(this);
  }

  async index(req: Request, res: Response) {
    try {
      const users = await this.userService.listUsers();

      return res.status(200).send({ data: users });
    } catch (error) {
      handleControllerError(error, res);
    }
  }

  async store(req: Request, res: Response) {
    try {
      const data: iUserCreate = req.body;
      const newUser = await this.userService.createUser(data);

      return res.status(201).send({ data: newUser });
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
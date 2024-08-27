import { Request, Response } from "express";
import { iConfirmEmail, iLogin } from "../interfaces/loginInterface";
import { handleControllerError } from "../errors/AppError";
import { LoginService } from "../services/loginService";

export class LoginController {
  private loginService = new LoginService();
  constructor() {
    this.login = this.login.bind(this);
    this.confirmEmail = this.confirmEmail.bind(this);
  }

  async login(req: Request, res: Response) {
    try {
      const data: iLogin = req.body;
      const login = await this.loginService.login(data);

      return res.status(201).send({ data: login });
    } catch (error) {
      handleControllerError(error, res);
    }
  }

  async confirmEmail(req: Request, res: Response) {
    try {
      const { id, email }: iConfirmEmail = req.body;
      await this.loginService.confirmEmail(email, id);

      return res.status(201).send({ data: "Email was confirmed" });
    } catch (error) {
      handleControllerError(error, res);
    }
  }
}

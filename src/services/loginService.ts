import { iLogin } from "../interfaces/loginInterface";
import { AppDataSource } from "../data-source";
import { Usuarios } from "../models/userModel";
import { Reset_password } from "../models/resetPasswordModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { gerarStringAleatoria } from "../utils/generatePin";
import { sendEmail } from "../utils/sendEmail";
import { templateHtmlResetPassword } from "../utils/templateEmails";

export class LoginService {
  private userRepository = AppDataSource.getRepository(Usuarios);
  private resetPasswordRepository = AppDataSource.getRepository(Reset_password);

  constructor() {
    this.login = this.login.bind(this);
    this.confirmEmail = this.confirmEmail.bind(this);
    this.requestResetPassword = this.requestResetPassword.bind(this);
    this.confirmPin = this.confirmPin.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
  }

  async login(data: iLogin) {
    try {
      console.log('lginiiii')
      const account = await this.userRepository.findOneBy({ email: data.email });

      if (!account?.id || !bcrypt.compareSync(data.password, account.password)) {
        throw new AppError("Email ou Senha errados", 404);
      }

      const token = jwt.sign(
        { email: data.email },
        String(process.env.JWT_SECRET),
        { expiresIn: "1d" }
      );

      return { token };
    } catch (error) {
      throw new AppError("Erro ao realizar o login");
    }
  }

  async confirmEmail(id: string, email: string) {
    try {
      const user = await this.userRepository.findOneBy({ email, id });

      if (!user?.id) {
        throw new AppError("Email não encontrado", 404);
      }

      await this.userRepository.save(user);
    } catch (error) {
      throw new AppError("Erro ao confirmar o e-mail");
    }
  }

  async requestResetPassword(email: string) {
    try {
      const user = await this.userRepository.findOneBy({ email });

      if (!user) {
        throw new AppError("Usuário não encontrado", 404);
      }

      const pin = gerarStringAleatoria();
      const resetPassword = this.resetPasswordRepository.create({
        pin,
        user: user.id,
      });

      const createRequest = await this.resetPasswordRepository.save(resetPassword);

      if (createRequest.id) {
        const templateEmail = templateHtmlResetPassword(user.name, pin);
        await sendEmail({
          to: user.email,
          text: templateEmail,
          subject: "Redefinição de senha",
        });
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new AppError("Erro ao solicitar reset da senha");
    }
  }

  async confirmPin() {
    // Implementação do método confirmPin()
  }

  async resetPassword(email: string, newPassword: string) {
    try {
      const user = await this.userRepository.findOneBy({ email });

      if (!user) {
        throw new AppError("Usuário não encontrado", 404);
      }

      user.password = bcrypt.hashSync(newPassword, 10);

      await this.userRepository.save(user);
    } catch (error) {
      throw new AppError("Erro ao solicitar reset da senha");
    }
  }
}


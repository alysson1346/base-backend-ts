import { iUser, iUserCreate } from "../interfaces/userInterface";
import { AppDataSource } from "../data-source";
import { Usuarios } from "../models/userModel";
import bcrypt from "bcrypt";
import { AppError } from "../errors/AppError";

export class UserService {
  private userRepository = AppDataSource.getRepository(Usuarios);
  constructor() {
    this.listUsers = this.listUsers.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  async listUsers() {
    const users: iUser[] = await this.userRepository.find();
    return users;
  }

  async createUser(data: iUserCreate) {
    const alreadyExist = await this.userRepository.findOneBy({
      email: data.email,
    });
    if (alreadyExist?.id) {
      throw new AppError("Email já cadastrado", 409);
    }
    const user = this.userRepository.create({
      ...data,
      password: bcrypt.hashSync(data.password, 10),
      created_at: new Date(),
    });
    const createdUser: iUser = await this.userRepository.save(user);

    return createdUser;
  }
}

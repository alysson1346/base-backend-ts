import { iUser, iUserCreate, iLogin } from "../interfaces/userInterface";
import { AppDataSource } from "../data-source";
import { Usuarios } from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError";

export class UserService{
  private userRepository = AppDataSource.getRepository(Usuarios) 
  
  async listUsers(){
    const users:iUser[] = await this.userRepository.find()
    return users
  }
  
  async createUser(data:iUserCreate) {    
    const alreadyExist = await this.userRepository.findOneBy({email:data.email})
    if(alreadyExist?.id){
      throw new AppError("Email já cadastrado", 409) 
    }
    const user = this.userRepository.create({
      ...data,
      password:bcrypt.hashSync(data.password, 10),
      created_at: new Date()
    })
    const createdUser:iUser = await this.userRepository.save(user)
    
    return createdUser    
  }
  
  async login(data: iLogin) {
    const users = await this.userRepository.find()
    const account = users.find(user => user.email === data.email)

    if (!account ||!bcrypt.compareSync(data.password, account.password)) {
        throw new AppError("Email ou Senha errados", 404)      
    }

    const token = jwt.sign(
        {email: data.email},
        String(process.env.JWT_SECRET),
        {expiresIn: '1d'}
    )

    return {token}    
  }
}

import { iUser, iUserCreate, iLogin } from "../interfaces/userInterface";
import { AppDataSource } from "../data-source";
import { Usuarios } from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UserService{
  async listUsers(){
    const userRepository = AppDataSource.getRepository(Usuarios)
    const users:iUser[] = await userRepository.find()
    return users
  }
  
  async createUser(data:iUserCreate){
    const userRepository = AppDataSource.getRepository(Usuarios)    
    const alreadyExist = await userRepository.findOneBy({email:data.email})
    if(alreadyExist?.id){
      throw new Error("Email já cadastrado")      
    }
    const user = userRepository.create({
      ...data,
      password:bcrypt.hashSync(data.password,10),
      created_at: new Date()
    })
    const createdUser:iUser = await userRepository.save(user)
    
    return createdUser    
  }
  
  async login(data:iLogin){
    const userRepository = AppDataSource.getRepository(Usuarios)

    const users = await userRepository.find()

    const account = users.find(user => user.email === data.email)

    if (!account) {
        throw new Error("Account not found")
    }

    if(!bcrypt.compareSync(data.password, account.password)){
        throw new Error("Wrong email/password")
    }

    const token = jwt.sign(
        {email: data.email},
        String(process.env.JWT_SECRET),
        {expiresIn: '1d'}
    )

    return token    
  }
}

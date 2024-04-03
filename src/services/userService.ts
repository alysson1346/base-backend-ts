// src/services/user/userCreate.service.ts

import { iUser, iUserCreate, iLogin } from "../interfaces/userInterface";
import { AppDataSource } from "../data-source";
import { User } from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UserService{
  async listUsers(/* {authorization}:any */){
    const userRepository = AppDataSource.getRepository(User)
    const users:iUser[] = await userRepository.find()
    
    // if(!authorization){
    //   throw new Error("Token not provided")
    // }
    
    // const token = authorization.split(" ")[1]
    
  //   const account = jwt.verify(token, String(process.env.JWT_SECRET), (err, decoded) => {
  //     if (!decoded) {
  //         throw new Error("Invalid token")
  //     }

  //     const user = users.find(user => user.email === (<any>decoded).email)

  //     return user

  // })
    
    return users
  }
  
  async createUser(data:iUserCreate){
    const userRepository = AppDataSource.getRepository(User)    
    const user = userRepository.create({
      ...data,
      password:bcrypt.hashSync(data.password,10),
      created_at: new Date()
    })
    const createdUser:iUser = await userRepository.save(user)
    
    return createdUser    
  }
  
  async login(data:iLogin){
    const userRepository = AppDataSource.getRepository(User)

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
import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { iLogin, iUserCreate } from "../interfaces/userInterface";
import { handleError } from "../errors/AppError";

export class UserController{
  async index(req:Request, res:Response){
    try {
      const userService = new UserService()
      const users = await userService.listUsers()
      
      return res.status(200).send({data:users})
      
    } catch (error) {
      if (error instanceof Error) {
       handleError(400, error.message, res);
     }
   } 
    
  }
  
  async store(req:Request, res:Response){
    try {
      const data:iUserCreate = req.body
      const userService = new UserService()
      const newUser = await userService.createUser(data)
      
      return res.status(201).send({data:newUser})
      
    } catch (error) {
       if (error instanceof Error) {
        handleError(400, error.message, res);
      }
    }   
  }
  
  async login(req:Request, res:Response){
    try {
      const data:iLogin = req.body
      const userService = new UserService() 
      const login = await userService.login(data)     
      
      return res.status(201).send({data:login})
    } catch (error) {
      if (error instanceof Error) {
        handleError(400, error.message, res);
      }
      
    }
    
    
  }
}
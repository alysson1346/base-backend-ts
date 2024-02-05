import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { iLogin, iUserCreate } from "../interfaces/userInterface";

export class UserController{
  async index(req:Request, res:Response){
    try {
      const userService = new UserService()
      const users = await userService.listUsers()
      
      return res.status(200).send({data:users})
      
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send({
          error: error.name,
          message: error.message,
        });
      }       
    }
    
  }
  
  async store(req:Request, res:Response){
    try {
      const data:iUserCreate = req.body
      const userService = new UserService()
      const newUser = await userService.createUser(data)
      
      return res.status(201).send({data:newUser})
      
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).send({
          error: err.name,
          message: err.message,
        });
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
        return res.status(400).send({
          error: error.name,
          message: error.message,
        });
      }
      
    }
    
    
  }
}
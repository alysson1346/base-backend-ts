import { schemaValidation } from "../middlewares/schemaValidator.middlewares";
import { LoginController } from "../controllers/loginController";
import { LoginSchema } from "../schemas/login.schema";
import express from "express";

const loginController = new LoginController();
export const LoginRoutes = express.Router();

LoginRoutes.post(
  "/login",
  schemaValidation(LoginSchema.loginSchema),
  loginController.login
);

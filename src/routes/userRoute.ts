import express from "express";
import { UserController } from "../controllers/userController";
import { authRequired } from "../middlewares/authUser.middlewares";
import { schemaValidation } from "../middlewares/schemaValidator.middlewares";
import { UsuariosSchema } from "../schemas/usuarios.schema";
import { upload } from "../middlewares/uploadImage.middlewares";

const userController = new UserController();

export const UserRoutes = express.Router();
export const UserSecureRoutes = express.Router();
UserSecureRoutes.use(authRequired);


/* User */
UserRoutes.post(
  "/user",
  schemaValidation(UsuariosSchema.createUserSchema),
  userController.store
);
UserSecureRoutes.get("/users", userController.index);
UserRoutes.post("/email", userController.sendEmail);
UserRoutes.post("/upload", upload.single("image"), userController.sendImage);
UserRoutes.post("/uploads", upload.array("images", 10), userController.sendImages);

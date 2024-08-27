import * as yup from "yup";

export class UsuariosSchema {
  public static createUserSchema = yup.object().shape({
    name: yup.string().required("Nome obrigatório!").max(60),
    email: yup
      .string()
      .required("Email obrigatório!")
      .email("Informe um email!")
      .max(30, "O email deve ter no máximo 30 caracteres!"),
    password: yup
      .string()
      .required("Senha obrigatória!")
      .min(6, "A senha deve ter no mínimo 6 caracteres.")
      .max(25, "A senha deve ter no máximo 25 caracteres."),
    // confirmPassword: yup.string().required().oneOf([yup.ref("password")], "As senha devem ser iguais!"),
    is_admin: yup.boolean(),
  });
}

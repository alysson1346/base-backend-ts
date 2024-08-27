import * as yup from "yup";

export class LoginSchema {
  public static loginSchema = yup.object().shape({
    email: yup
      .string()
      .required("Email obrigatório")
      .email("Informe um email válido!")
      .max(30, "O email deve ter no máximo 30 caracteres!"),
    password: yup
      .string()
      .required("Informe a sua senha!")
      .min(6, "A senha deve ter no mínimo 6 caracteres.")
      .max(25, "A senha deve ter no máximo 25 caracteres."),
  });
}

function templateHtmlRegisterUser(username: string, confirmationCode: string) {
  return `<div style="font-family: Arial, sans-serif;">
<h2>Ol&aacute; ${username},</h2>

<p>Obrigado por se cadastrar em nosso sistema. Para concluir o processo de cadastro, por favor, confirme seu e-mail.</p>

<p>Seu c&oacute;digo de confirma&ccedil;&atilde;o &eacute;: <strong>${confirmationCode}</strong></p>

<p>Por favor, insira este c&oacute;digo no nosso formul&aacute;rio de confirma&ccedil;&atilde;o.</p>

<p>Se voc&ecirc; n&atilde;o solicitou este cadastro, por favor, ignore este e-mail.</p>

<p>Atenciosamente,</p>

<p>Alysson Marcos</p>
</div>
`;
}

export { templateHtmlRegisterUser };

import { createTransport } from 'nodemailer';
import { IEmailRequest } from '../interfaces/emailInterface';
import 'dotenv/config';

const sendEmail = async ({ subject, text, to }: IEmailRequest) => {
    const ht = `<div style="font-family: Arial, sans-serif;">
<h2>Ol&aacute; {{ username }},</h2>

<p>Obrigado por se cadastrar em nosso sistema. Para concluir o processo de cadastro, por favor, confirme seu e-mail.</p>

<p>Seu c&oacute;digo de confirma&ccedil;&atilde;o &eacute;: <strong>{{ confirmationCode }}</strong></p>

<p>Por favor, insira este c&oacute;digo no nosso formul&aacute;rio de confirma&ccedil;&atilde;o.</p>

<p>Se voc&ecirc; n&atilde;o solicitou este cadastro, por favor, ignore este e-mail.</p>

<p>Atenciosamente,</p>

<p>A equipe do AlysTech</p>
</div>
`

    const transporter = createTransport({
        host: "smtp-mail.outlook.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });
  
    try {
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: to,
            subject: subject,
            html: ht
        });
        console.log('Email sent with success');
    } catch (err) {
        console.error(err);
        throw new Error('Error sending email, try again later');
    }
};

export { sendEmail };

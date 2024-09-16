import nodemailer from 'nodemailer'
import { UserType } from '../types';

const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASSWORD
    }
  });

export const sendMail = async(user: UserType, token: string)=> {
    let message = {
        from: 'TaskManagerService.com',
        to: `${user.email}`,
        subject: 'Envio de token',
        text: 'Hola',
        html: `<h1>Bienvenido: ${user.name}</h1><br>
            <p>Este es tu token de validación: <strong>${token}</strong></p><br>
            <h3>Esperamos que disfrutes mucho utilizando nuestra aplicación</h3>
        `
    }
    await transport.sendMail(message)
}
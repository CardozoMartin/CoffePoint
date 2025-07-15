import axios from "axios";
import transporter from "../database/nodemailer";



export class EmailService {

   constructor(){}

    //aca irian los modelos de email que queremos enviar

    async enviarEmailDeBienvenida(email:string, nombre:string, token: string): Promise<void>{
        console.log("Enviando email de bienvenida a:", email);
        console.log("Nombre del cliente:", nombre);


        const enlaceVerificacion = `http://localhost:4000/api/cliente/verificarcuenta/${token}`;
        try {
            //hacemos peticion a axios para verirficar la cuenta
            

            

            //creamos el mensaje de bienvenida en HTML
            const mensaje = `
              <div style="font-family: Arial, sans-serif; background: #f7f7f7; padding: 30px;">
                <div style="max-width: 500px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.07); padding: 32px;">
                  <h2 style="color: #6f4e37;">¡Bienvenido, ${nombre}!</h2>
                  <p>Gracias por unirte a <b>CaffePoint</b>. Estamos emocionados de tenerte con nosotros.</p>
                  <p>Para comenzar, por favor valida tu email haciendo click en el siguiente botón:</p>
                  <div style="text-align: center; margin: 32px 0;">
                    <a href="${enlaceVerificacion}"
                       style="background: #6f4e37; color: #fff; padding: 14px 32px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 16px;">
                      Validar mi email
                    </a>
                  </div>
                  <p style="color: #888;">Si tienes alguna pregunta, no dudes en contactarnos.<br>¡Disfruta tu experiencia!</p>
                  <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;">
                  <p style="font-size: 13px; color: #aaa;">Equipo CaffePoint</p>
                </div>
              </div>
            `;

            //llamamos al transporter para enviar el correo
            await transporter.sendMail({
                from: 'martincardozo1993xp@gmail.com',
                to: email,
                subject: 'Bienvenido a nuestra plataforma',
                html: mensaje
            })
        } catch (error) {
            console.error("Error al enviar el correo de bienvenida:", error);
            throw new Error("No se pudo enviar el correo de bienvenida.");
        }
    }
}
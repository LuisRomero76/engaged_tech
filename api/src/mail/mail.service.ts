import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { CreatePurchaseDto } from 'src/compra/dto/create-compra.dto';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    const mailConfig = {
      host: this.configService.get<string>('MAIL_HOST'),
      port: this.configService.get<number>('MAIL_PORT'),
      secure: false,
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASS'),
      },
    };
    this.transporter = nodemailer.createTransport(mailConfig);
  }

  async sendPurchaseEmail(data: CreatePurchaseDto) {
    const { email, nombre, apellido, productoNombre, precio, telefono } = data;

    const mailOptions = {
      from: `"Tienda Engaged" <${this.configService.get<string>('MAIL_USER')}>`,
      to: email,
      subject: `Confirmación de Compra: ${productoNombre}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto;">
          <h2 style="color: #333;">¡Hola ${nombre} ${apellido}!</h2>
          <p>Hemos recibido tu pedido correctamente. Aquí tienes los detalles:</p>
          <div style="background-color: #f4f4f4; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Producto</h3>
            <p><strong>Nombre:</strong> ${productoNombre}</p>
            <p><strong>Precio:</strong> $${precio}</p>
          </div>
          <div style="background-color: #f4f4f4; padding: 15px; border-radius: 5px;">
            <h3 style="margin-top: 0;">Tus Datos</h3>
            <p><strong>Nombre:</strong> ${nombre} ${apellido}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Teléfono:</strong> ${telefono}</p>
          </div>
          <p style="margin-top: 20px;">Gracias por confiar en nosotros.</p>
        </div>
      `,
    };

    try {
      await this.transporter.verify();
      const info = await this.transporter.sendMail(mailOptions);
      
      return info;
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      console.error('Detalles del error:', {
        message: error.message,
        code: error.code,
        command: error.command,
      });
      throw error;
    }
  }
}
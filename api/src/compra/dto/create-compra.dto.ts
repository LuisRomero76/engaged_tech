import { IsEmail, IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';

export class CreatePurchaseDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es requerido' })
  nombre: string;

  @IsString()
  @IsNotEmpty({ message: 'El apellido es requerido' })
  apellido: string;

  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'El email es requerido' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'El teléfono es requerido' })
  telefono: string;

  @IsString()
  @IsNotEmpty({ message: 'El nombre del producto es requerido' })
  productoNombre: string;

  @IsNumber({}, { message: 'El precio debe ser un número' })
  @Min(0, { message: 'El precio debe ser mayor o igual a 0' })
  precio: number;
}
import {
  CorreoLista,
  IsEmail,
  IsNotEmpty,
  IsString,
} from '../../../common/validation'
import { PersonaDto } from './persona.dto'

export class CrearUsuarioCuentaDto {
  persona: PersonaDto
  @IsNotEmpty()
  @IsEmail()
  @CorreoLista()
  correoElectronico: string
  @IsString()
  @IsNotEmpty()
  contrasenaNueva: string

  @IsString()
  @IsNotEmpty()
  usuario: string
}

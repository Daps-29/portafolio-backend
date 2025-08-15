import {
  CorreoLista,
  IsEmail,
  IsNotEmpty,
  ValidateNested,
} from '../../../common/validation'
import { PersonaDto } from './persona.dto'

export class CrearUsuarioDto {
  usuario?: string
  estado?: string
  contrasena?: string
  @IsNotEmpty()
  @IsEmail()
  @CorreoLista()
  correoElectronico: string
  @ValidateNested()
  persona: PersonaDto

  @IsNotEmpty()
  roles: Array<string>
  usuarioCreacion?: string
}

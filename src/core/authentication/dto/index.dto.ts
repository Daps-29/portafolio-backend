import { IsNotEmpty, IsString } from '../../../common/validation'

export class CambioRolDto {
  @IsString()
  @IsNotEmpty()
  idRol: string
}

export class TokenDto {
  @IsString()
  @IsNotEmpty()
  token: string
}

export class AuthDto {
  usuario: string

  contrasena: string
}

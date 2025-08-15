import { IsNotEmpty } from 'class-validator'

export class ActualizarRolDto {
  @IsNotEmpty()
  rol: string

  @IsNotEmpty()
  nombre: string

  estado?: string
}

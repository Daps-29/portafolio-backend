import { IsNotEmpty } from 'class-validator'

export class CrearRolDto {
  @IsNotEmpty()
  rol: string

  @IsNotEmpty()
  nombre: string

  estado?: string
}

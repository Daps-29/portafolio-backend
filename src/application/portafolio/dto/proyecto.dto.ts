import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CrearProyectoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string

  @IsString()
  @IsNotEmpty()
  descripcion: string

  @IsString()
  @IsOptional()
  enlace?: string | null

  @IsString()
  @IsOptional()
  tecnologias?: string | null
}

export class ActualizarProyectoDto {
  @IsString()
  @IsOptional()
  nombre?: string

  @IsString()
  @IsOptional()
  descripcion?: string

  @IsString()
  @IsOptional()
  enlace?: string | null

  @IsString()
  @IsOptional()
  tecnologias?: string | null

  @IsString()
  @IsOptional()
  estado?: string
}

import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CrearExperienciaDto {
  @IsString()
  @IsNotEmpty()
  empresa: string
  @IsString()
  @IsNotEmpty()
  puesto: string
  @IsDate()
  fechaInicio: Date
  @IsDate()
  @IsOptional()
  fechaFin: Date | null
  @IsString()
  @IsOptional()
  descripcion: string
}

export class ActualizarExperienciaDto {
  @IsString()
  empresa: string
  @IsString()
  puesto: string
  @IsDate()
  fechaInicio: Date
  @IsDate()
  @IsOptional()
  fechaFin: Date | null
  @IsString()
  @IsOptional()
  descripcion: string | null
  @IsString()
  estado: string
}

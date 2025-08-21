// No changes needed as the validations are already present.
import { IsString, IsOptional, IsNotEmpty, IsInt, Min, Max } from 'class-validator'
export class CrearHabilidadDto {
  @IsString()
  @IsNotEmpty()
  nombre: string

  @IsInt()
  @Min(1)
  @Max(5)
  nivel: number
}

export class ActualizarHabilidadDto {
  @IsString()
  @IsOptional()
  nombre?: string

  @IsInt()
  @Min(1)
  @Max(5)
  @IsOptional()
  nivel?: number

  @IsString()
  @IsOptional()
  estado?: string
}

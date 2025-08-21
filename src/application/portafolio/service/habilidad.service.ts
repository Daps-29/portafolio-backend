import { Injectable } from '@nestjs/common'
import { HabilidadRepository } from '../repository/habilidad.repository'
import { CrearHabilidadDto, ActualizarHabilidadDto } from '../dto/habilidad.dto'
import { PaginacionQueryDto } from '@/common/dto/paginacion-query.dto'

@Injectable()
export class HabilidadService {
  constructor(private readonly habilidadRepository: HabilidadRepository) {}

  async crear(dto: CrearHabilidadDto, usuarioAuditoria: string) {
    return this.habilidadRepository.crear(dto, usuarioAuditoria)
  }

  async actualizar(id: string, dto: ActualizarHabilidadDto, usuarioAuditoria: string) {
    return this.habilidadRepository.actualizar(id, dto, usuarioAuditoria)
  }

  async buscarPorId(id: string) {
    return this.habilidadRepository.buscarPorId(id)
  }

  async listar(paginacion: PaginacionQueryDto) {
    return this.habilidadRepository.listar(paginacion)
  }

  async listarPorNombre(nombre: string) {
    return this.habilidadRepository.listarPorNombre(nombre)
  }

  async buscarPorNombre(nombre: string) {
    return this.habilidadRepository.buscarPorNombre(nombre)
  }
}

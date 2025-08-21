import { Injectable, PreconditionFailedException } from '@nestjs/common'
import { ProyectoRepository } from '../repository/proyecto.repository'
import { CrearProyectoDto, ActualizarProyectoDto } from '../dto/proyecto.dto'
import { PaginacionQueryDto } from '@/common/dto/paginacion-query.dto'

@Injectable()
export class ProyectoService {
  constructor(private readonly proyectoRepository: ProyectoRepository) {}

  async crear(dto: CrearProyectoDto, usuarioAuditoria: string) {
    return this.proyectoRepository.crear(dto, usuarioAuditoria)
  }

  async actualizar(
    id: string,
    dto: ActualizarProyectoDto,
    usuarioAuditoria: string
  ) {
    const proyectoExistente = await this.proyectoRepository.buscarPorId(id)
    if (!proyectoExistente) {
      throw new PreconditionFailedException('Proyecto no encontrado')
    }
    return this.proyectoRepository.actualizar(id, dto, usuarioAuditoria)
  }

  async listar(paginacion: PaginacionQueryDto) {
    return this.proyectoRepository.listar(paginacion)
  }

  async buscarPorNombre(nombre: string) {
    return this.proyectoRepository.buscarPorNombre(nombre)
  }
}

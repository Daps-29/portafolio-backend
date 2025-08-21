import { Injectable, PreconditionFailedException } from '@nestjs/common'
import { ExperienciaRepository } from '../repository/experiencia.repository'
import {
  CrearExperienciaDto,
  ActualizarExperienciaDto,
} from '../dto/experiencia.dto'
import { PaginacionQueryDto } from '@/common/dto/paginacion-query.dto'

@Injectable()
export class ExperienciaService {
  constructor(private readonly experienciaRepository: ExperienciaRepository) {}

  async crear(dto: CrearExperienciaDto, usuarioAuditoria: string) {
    return this.experienciaRepository.crear(dto, usuarioAuditoria)
  }

  async actualizar(
    id: string,
    dto: ActualizarExperienciaDto,
    usuarioAuditoria: string
  ) {
    const experienciaExistente =
      await this.experienciaRepository.buscarPorId(id)
    if (!experienciaExistente) {
      throw new PreconditionFailedException('Experiencia no encontrada')
    }
    return this.experienciaRepository.actualizar(id, dto, usuarioAuditoria)
  }

  async listar(paginacion: PaginacionQueryDto) {
    return this.experienciaRepository.listar(paginacion)
  }

  async listarPorEmpresa(empresa: string) {
    return this.experienciaRepository.listarPorEmpresa(empresa)
  }

  async buscarPorEmpresa(empresa: string) {
    return this.experienciaRepository.buscarPorEmpresa(empresa)
  }
}

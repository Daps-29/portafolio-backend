import { Injectable } from '@nestjs/common'
import { RedSocialRepository } from '../repository/red-social.repository'
import { CrearRedSocialDto, ActualizarRedSocialDto } from '../dto/red-social.dto'
import { PaginacionQueryDto } from '@/common/dto/paginacion-query.dto'

@Injectable()
export class RedSocialService {
  constructor(private readonly redSocialRepository: RedSocialRepository) {}

  async crear(dto: CrearRedSocialDto, usuarioAuditoria: string) {
    return this.redSocialRepository.crear(dto, usuarioAuditoria)
  }

  async actualizar(id: string, dto: ActualizarRedSocialDto, usuarioAuditoria: string) {
    return this.redSocialRepository.actualizar(id, dto, usuarioAuditoria)
  }

  async buscarPorId(id: string) {
    return this.redSocialRepository.buscarPorId(id)
  }

  async listar(paginacion: PaginacionQueryDto) {
    return this.redSocialRepository.listar(paginacion)
  }

  async listarPorNombre(nombre: string) {
    return this.redSocialRepository.listarPorNombre(nombre)
  }

  async buscarPorNombre(nombre: string) {
    return this.redSocialRepository.buscarPorNombre(nombre)
  }
}

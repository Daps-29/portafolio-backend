import { Brackets, DataSource } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { Experiencia } from '../entity/experiencia.entity'
import { ExperienciaEstado } from '../entity/experiencia.entity'
import { PaginacionQueryDto } from '@/common/dto/paginacion-query.dto'
import {
  ActualizarExperienciaDto,
  CrearExperienciaDto,
} from '../dto/experiencia.dto'

@Injectable()
export class ExperienciaRepository {
  constructor(private dataSource: DataSource) {}

  async buscarPorId(id: string) {
    return await this.dataSource
      .getRepository(Experiencia)
      .createQueryBuilder('experiencia')
      .where({ id: id })
      .getOne()
  }

  async actualizar(
    id: string,
    experienciaDto: ActualizarExperienciaDto,
    usuarioAuditoria: string
  ) {
    const datosActualizar = new Experiencia({
      ...experienciaDto,
      usuarioModificacion: usuarioAuditoria,
    })
    return await this.dataSource
      .getRepository(Experiencia)
      .update(id, datosActualizar)
  }

  async listar(paginacionQueryDto: PaginacionQueryDto) {
    const { limite, saltar, filtro, orden, sentido } = paginacionQueryDto
    const query = this.dataSource
      .getRepository(Experiencia)
      .createQueryBuilder('experiencia')
      .select([
        'experiencia.id',
        'experiencia.empresa',
        'experiencia.puesto',
        'experiencia.fechaInicio',
        'experiencia.fechaFin',
        'experiencia.descripcion',
        'experiencia.estado',
      ])
      .take(limite)
      .skip(saltar)

    switch (orden) {
      case 'empresa':
        query.addOrderBy('experiencia.empresa', sentido)
        break
      case 'puesto':
        query.addOrderBy('experiencia.puesto', sentido)
        break
      case 'fechaInicio':
        query.addOrderBy('experiencia.fechaInicio', sentido)
        break
      case 'estado':
        query.addOrderBy('experiencia.estado', sentido)
        break
      default:
        query.orderBy('experiencia.id', 'ASC')
    }

    if (filtro) {
      query.andWhere(
        new Brackets((qb) => {
          qb.orWhere('experiencia.empresa ilike :filtro', {
            filtro: `%${filtro}%`,
          })
          qb.orWhere('experiencia.puesto ilike :filtro', {
            filtro: `%${filtro}%`,
          })
          qb.orWhere('experiencia.descripcion ilike :filtro', {
            filtro: `%${filtro}%`,
          })
        })
      )
    }
    return await query.getManyAndCount()
  }

  async listarPorEmpresa(empresa: string) {
    return await this.dataSource
      .getRepository(Experiencia)
      .createQueryBuilder('experiencia')
      .select(['experiencia.id', 'experiencia.empresa', 'experiencia.puesto'])
      .where('experiencia.empresa ilike :empresa', {
        empresa: `%${empresa}%`,
      })
      .andWhere('experiencia.estado = :estado', {
        estado: ExperienciaEstado.ACTIVO,
      })
      .getMany()
  }

  async buscarPorEmpresa(empresa: string) {
    return this.dataSource
      .getRepository(Experiencia)
      .findOne({ where: { empresa: empresa } })
  }

  async crear(experienciaDto: CrearExperienciaDto, usuarioAuditoria: string) {
    const { empresa, puesto, fechaInicio, fechaFin, descripcion } =
      experienciaDto

    const experiencia = new Experiencia()
    experiencia.empresa = empresa
    experiencia.puesto = puesto
    experiencia.fechaInicio = fechaInicio
    experiencia.fechaFin = fechaFin ?? null
    experiencia.descripcion = descripcion ?? ''
    experiencia.usuarioCreacion = usuarioAuditoria

    return await this.dataSource.getRepository(Experiencia).save(experiencia)
  }
}

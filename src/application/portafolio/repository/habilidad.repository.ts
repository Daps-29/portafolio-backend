import { Brackets, DataSource } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { Habilidad } from '../entity/habilidad.entity'
import { HabilidadEstado } from '../entity/habilidad.entity'
import { PaginacionQueryDto } from '@/common/dto/paginacion-query.dto'
import { ActualizarHabilidadDto, CrearHabilidadDto } from '../dto/habilidad.dto'

@Injectable()
export class HabilidadRepository {
  constructor(private dataSource: DataSource) {}

  async buscarPorId(id: string) {
    return await this.dataSource
      .getRepository(Habilidad)
      .createQueryBuilder('habilidad')
      .where({ id: id })
      .getOne()
  }

  async actualizar(
    id: string,
    habilidadDto: ActualizarHabilidadDto,
    usuarioAuditoria: string
  ) {
    const datosActualizar = new Habilidad({
      ...habilidadDto,
      usuarioModificacion: usuarioAuditoria,
    })
    return await this.dataSource
      .getRepository(Habilidad)
      .update(id, datosActualizar)
  }

  async listar(paginacionQueryDto: PaginacionQueryDto) {
    const { limite, saltar, filtro, orden, sentido } = paginacionQueryDto
    const query = this.dataSource
      .getRepository(Habilidad)
      .createQueryBuilder('habilidad')
      .select([
        'habilidad.id',
        'habilidad.nombre',
        'habilidad.nivel',
        'habilidad.estado',
      ])
      .take(limite)
      .skip(saltar)

    switch (orden) {
      case 'nombre':
        query.addOrderBy('habilidad.nombre', sentido)
        break
      case 'nivel':
        query.addOrderBy('habilidad.nivel', sentido)
        break
      case 'estado':
        query.addOrderBy('habilidad.estado', sentido)
        break
      default:
        query.orderBy('habilidad.id', 'ASC')
    }

    if (filtro) {
      query.andWhere(
        new Brackets((qb) => {
          qb.orWhere('habilidad.nombre ilike :filtro', {
            filtro: `%${filtro}%`,
          })
        })
      )
    }
    return await query.getManyAndCount()
  }

  async listarPorNombre(nombre: string) {
    return await this.dataSource
      .getRepository(Habilidad)
      .createQueryBuilder('habilidad')
      .select(['habilidad.id', 'habilidad.nombre', 'habilidad.nivel'])
      .where('habilidad.nombre ilike :nombre', {
        nombre: `%${nombre}%`,
      })
      .andWhere('habilidad.estado = :estado', {
        estado: HabilidadEstado.ACTIVO,
      })
      .getMany()
  }

  async buscarPorNombre(nombre: string) {
    return this.dataSource
      .getRepository(Habilidad)
      .findOne({ where: { nombre: nombre } })
  }

  async crear(habilidadDto: CrearHabilidadDto, usuarioAuditoria: string) {
    const { nombre, nivel } = habilidadDto

    const habilidad = new Habilidad()
    habilidad.nombre = nombre
    habilidad.nivel = nivel
    habilidad.usuarioCreacion = usuarioAuditoria

    return await this.dataSource.getRepository(Habilidad).save(habilidad)
  }
}

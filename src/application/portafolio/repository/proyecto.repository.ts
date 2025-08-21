import { Brackets, DataSource } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { ActualizarProyectoDto, CrearProyectoDto } from '../dto/proyecto.dto'
import { Proyecto } from '../entity/proyecto.entity'
import { ProyectoEstado } from '../entity/proyecto.entity'
import { PaginacionQueryDto } from '@/common/dto/paginacion-query.dto'

@Injectable()
export class ProyectoRepository {
  constructor(private dataSource: DataSource) {}

  async buscarPorId(id: string) {
    return await this.dataSource
      .getRepository(Proyecto)
      .createQueryBuilder('proyecto')
      .where({ id: id })
      .getOne()
  }

  async actualizar(
    id: string,
    proyectoDto: ActualizarProyectoDto,
    usuarioAuditoria: string
  ) {
    const datosActualizar = new Proyecto({
      ...proyectoDto,
      usuarioModificacion: usuarioAuditoria,
    } as any)
    return await this.dataSource
      .getRepository(Proyecto)
      .update(id, datosActualizar)
  }

  async listar(paginacionQueryDto: PaginacionQueryDto) {
    const { limite, saltar, filtro, orden, sentido } = paginacionQueryDto
    const query = this.dataSource
      .getRepository(Proyecto)
      .createQueryBuilder('proyecto')
      .select([
        'proyecto.id',
        'proyecto.nombre',
        'proyecto.descripcion',
        'proyecto.enlace',
        'proyecto.tecnologias',
        'proyecto.estado',
      ])
      .take(limite)
      .skip(saltar)

    switch (orden) {
      case 'nombre':
        query.addOrderBy('proyecto.nombre', sentido)
        break
      case 'descripcion':
        query.addOrderBy('proyecto.descripcion', sentido)
        break
      case 'tecnologias':
        query.addOrderBy('proyecto.tecnologias', sentido)
        break
      case 'estado':
        query.addOrderBy('proyecto.estado', sentido)
        break
      default:
        query.orderBy('proyecto.id', 'ASC')
    }

    if (filtro) {
      query.andWhere(
        new Brackets((qb) => {
          qb.orWhere('proyecto.nombre ilike :filtro', { filtro: `%${filtro}%` })
          qb.orWhere('proyecto.descripcion ilike :filtro', {
            filtro: `%${filtro}%`,
          })
          qb.orWhere('proyecto.tecnologias ilike :filtro', {
            filtro: `%${filtro}%`,
          })
        })
      )
    }
    return await query.getManyAndCount()
  }

  async listarPorTecnologia(tecnologia: string) {
    return await this.dataSource
      .getRepository(Proyecto)
      .createQueryBuilder('proyecto')
      .select(['proyecto.id', 'proyecto.nombre', 'proyecto.tecnologias'])
      .where('proyecto.tecnologias ilike :tecnologia', {
        tecnologia: `%${tecnologia}%`,
      })
      .andWhere('proyecto.estado = :estado', {
        estado: ProyectoEstado.ACTIVO,
      })
      .getMany()
  }

  async buscarPorNombre(nombre: string) {
    return this.dataSource
      .getRepository(Proyecto)
      .findOne({ where: { nombre: nombre } })
  }

  async crear(proyectoDto: CrearProyectoDto, usuarioAuditoria: string) {
    const { nombre, descripcion, enlace, tecnologias } = proyectoDto

    const proyecto = new Proyecto()
    proyecto.nombre = nombre
    proyecto.descripcion = descripcion
    proyecto.enlace = enlace ?? ''
    proyecto.tecnologias = tecnologias ?? ''
    proyecto.usuarioCreacion = usuarioAuditoria

    return await this.dataSource.getRepository(Proyecto).save(proyecto)
  }
}

import { Brackets, DataSource } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { ActualizarRedSocialDto, CrearRedSocialDto } from '../dto/red-social.dto'
import { RedSocial } from '../entity/red-social.entity'
import { RedSocialEstado } from '../entity/red-social.entity'
import { PaginacionQueryDto } from '@/common/dto/paginacion-query.dto'

@Injectable()
export class RedSocialRepository {
	constructor(private dataSource: DataSource) {}

	async buscarPorId(id: string) {
		return await this.dataSource
			.getRepository(RedSocial)
			.createQueryBuilder('redSocial')
			.where({ id: id })
			.getOne()
	}

	async actualizar(
		id: string,
		redSocialDto: ActualizarRedSocialDto,
		usuarioAuditoria: string
	) {
		const datosActualizar = new RedSocial({
			...redSocialDto,
			usuarioModificacion: usuarioAuditoria,
		})
		return await this.dataSource
			.getRepository(RedSocial)
			.update(id, datosActualizar)
	}

	async listar(paginacionQueryDto: PaginacionQueryDto) {
		const { limite, saltar, filtro, orden, sentido } = paginacionQueryDto
		const query = this.dataSource
			.getRepository(RedSocial)
			.createQueryBuilder('redSocial')
			.select([
				'redSocial.id',
				'redSocial.nombre',
				'redSocial.url',
				'redSocial.estado',
			])
			.take(limite)
			.skip(saltar)

		switch (orden) {
			case 'nombre':
				query.addOrderBy('redSocial.nombre', sentido)
				break
			case 'estado':
				query.addOrderBy('redSocial.estado', sentido)
				break
			default:
				query.orderBy('redSocial.id', 'ASC')
		}

		if (filtro) {
			query.andWhere(
				new Brackets((qb) => {
					qb.orWhere('redSocial.nombre ilike :filtro', { filtro: `%${filtro}%` })
					qb.orWhere('redSocial.url ilike :filtro', { filtro: `%${filtro}%` })
				})
			)
		}
		return await query.getManyAndCount()
	}

	async listarPorNombre(nombre: string) {
		return await this.dataSource
			.getRepository(RedSocial)
			.createQueryBuilder('redSocial')
			.select(['redSocial.id', 'redSocial.nombre', 'redSocial.url'])
			.where('redSocial.nombre ilike :nombre', {
				nombre: `%${nombre}%`,
			})
			.andWhere('redSocial.estado = :estado', {
				estado: RedSocialEstado.ACTIVO,
			})
			.getMany()
	}

	async buscarPorNombre(nombre: string) {
		return this.dataSource
			.getRepository(RedSocial)
			.findOne({ where: { nombre: nombre } })
	}

	async crear(redSocialDto: CrearRedSocialDto, usuarioAuditoria: string) {
		const { nombre, url } = redSocialDto

		const redSocial = new RedSocial()
		redSocial.nombre = nombre
		redSocial.url = url
		redSocial.usuarioCreacion = usuarioAuditoria

		return await this.dataSource.getRepository(RedSocial).save(redSocial)
	}
}

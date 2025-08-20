import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  Check,
} from 'typeorm'
import { AuditoriaEntity } from '../../../common/entity/auditoria.entity'
import { UtilService } from '@/common/lib/util.service'

export const ProyectoEstado = {
  ACTIVO: 'ACTIVO',
  INACTIVO: 'INACTIVO',
}

@Check(UtilService.buildStatusCheck(ProyectoEstado))
@Entity({ name: 'proyectos', schema: process.env.DB_SCHEMA_PORTAFOLIO })
export class Proyecto extends AuditoriaEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string

  @Column({ length: 100, type: 'varchar', comment: 'Nombre del proyecto' })
  nombre: string

  @Column({ length: 255, type: 'varchar', comment: 'Descripción del proyecto' })
  descripcion: string

  @Column({
    length: 255,
    type: 'varchar',
    nullable: true,
    comment: 'Enlace al proyecto',
  })
  enlace: string

  @Column({
    length: 100,
    type: 'varchar',
    nullable: true,
    comment: 'Tecnologías usadas',
  })
  tecnologias: string

  constructor(data?: Partial<Proyecto>) {
    super(data)
  }

  @BeforeInsert()
  insertarEstado() {
    this.estado = this.estado || ProyectoEstado.ACTIVO
  }
}

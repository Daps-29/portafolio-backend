import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  Check,
} from 'typeorm'
import { AuditoriaEntity } from '../../../common/entity/auditoria.entity'
import { UtilService } from '@/common/lib/util.service'

export const ExperienciaEstado = {
  ACTIVO: 'ACTIVO',
  INACTIVO: 'INACTIVO',
}

@Check(UtilService.buildStatusCheck(ExperienciaEstado))
@Entity({ name: 'experiencias', schema: process.env.DB_SCHEMA_PORTAFOLIO })
export class Experiencia extends AuditoriaEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string

  @Column({ length: 100, type: 'varchar', comment: 'Nombre de la empresa' })
  empresa: string

  @Column({ length: 100, type: 'varchar', comment: 'Puesto o cargo' })
  puesto: string

  @Column({ type: 'date', comment: 'Fecha de inicio' })
  fechaInicio: Date

  @Column({ type: 'date', nullable: true, comment: 'Fecha de fin' })
  fechaFin: Date

  @Column({
    length: 255,
    type: 'varchar',
    nullable: true,
    comment: 'Descripción de la experiencia',
  })
  descripcion: string

  constructor(data?: Partial<Experiencia>) {
    super(data)
  }

  @BeforeInsert()
  insertarEstado() {
    this.estado = this.estado || ExperienciaEstado.ACTIVO
  }
}

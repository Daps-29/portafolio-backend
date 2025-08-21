import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  Check,
  CreateDateColumn,
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

  @CreateDateColumn({
    name: 'fecha_inicio',
    type: 'timestamp without time zone',
    nullable: false,
    default: () => 'now()',
  })
  fechaInicio: Date

  @CreateDateColumn({
    name: 'fecha_fin',
    type: 'timestamp without time zone',
    nullable: true,
    default: () => 'now()',
    comment: 'Fecha de creación',
  })
  fechaFin: Date | null

  @Column({
    length: 255,
    type: 'varchar',
    nullable: true,
    comment: 'Descripción de la experiencia',
  })
  descripcion: string | null

  constructor(data?: Partial<Experiencia>) {
    super(data)
  }

  @BeforeInsert()
  insertarEstado() {
    this.estado = this.estado || ExperienciaEstado.ACTIVO
  }
}

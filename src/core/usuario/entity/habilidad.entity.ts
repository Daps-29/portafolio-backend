import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BeforeInsert,
  Check,
} from 'typeorm'
import { Usuario } from './usuario.entity'
import { AuditoriaEntity } from '../../../common/entity/auditoria.entity'
import { UtilService } from '@/common/lib/util.service'

export const HabilidadEstado = {
  ACTIVO: 'ACTIVO',
  INACTIVO: 'INACTIVO',
}

@Check(UtilService.buildStatusCheck(HabilidadEstado))
@Entity({ name: 'habilidades', schema: process.env.DB_SCHEMA_USUARIOS })
export class Habilidad extends AuditoriaEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string

  @Column({ length: 50, type: 'varchar', comment: 'Nombre de la habilidad' })
  nombre: string

  @Column({ type: 'integer', comment: 'Nivel de habilidad (1-5)' })
  nivel: number

  @ManyToOne(() => Usuario, (usuario) => usuario.habilidades, {
    nullable: false,
  })
  usuario: Usuario

  constructor(data?: Partial<Habilidad>) {
    super(data)
  }

  @BeforeInsert()
  insertarEstado() {
    this.estado = this.estado || HabilidadEstado.ACTIVO
  }
}

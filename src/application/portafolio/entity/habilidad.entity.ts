import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BeforeInsert,
  Check,
  JoinColumn,
} from 'typeorm'
import { AuditoriaEntity } from '../../../common/entity/auditoria.entity'
import { UtilService } from '@/common/lib/util.service'
import { Usuario } from '@/core/usuario/entity/usuario.entity'

export const HabilidadEstado = {
  ACTIVO: 'ACTIVO',
  INACTIVO: 'INACTIVO',
}

@Check(UtilService.buildStatusCheck(HabilidadEstado))
@Entity({ name: 'habilidades', schema: process.env.DB_SCHEMA_PORTAFOLIO })
export class Habilidad extends AuditoriaEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string

  @Column({ length: 50, type: 'varchar', comment: 'Nombre de la habilidad' })
  nombre: string

  @Column({ type: 'integer', comment: 'Nivel de habilidad (1-5)' })
  nivel: number

  @Column({
    name: 'id_usuario',
    type: 'uuid',
    nullable: false,
    comment: 'clave foránea que referencia la tabla de Usuarios',
  })
  idUsuario: string

  @ManyToOne(() => Usuario, (usuario) => usuario.habilidades, {
    nullable: false,
  })
  @JoinColumn({
    name: 'id_usuario',
    referencedColumnName: 'id',
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

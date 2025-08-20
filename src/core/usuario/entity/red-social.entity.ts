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

export const RedSocialEstado = {
  ACTIVO: 'ACTIVO',
  INACTIVO: 'INACTIVO',
}

@Check(UtilService.buildStatusCheck(RedSocialEstado))
@Entity({ name: 'redes_sociales', schema: process.env.DB_SCHEMA_USUARIOS })
export class RedSocial extends AuditoriaEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string

  @Column({ length: 50, type: 'varchar', comment: 'Nombre de la red social' })
  nombre: string

  @Column({ length: 255, type: 'varchar', comment: 'URL del perfil' })
  url: string

  @ManyToOne(() => Usuario, (usuario) => usuario.redesSociales, {
    nullable: false,
  })
  usuario: Usuario

  constructor(data?: Partial<RedSocial>) {
    super(data)
  }

  @BeforeInsert()
  insertarEstado() {
    this.estado = this.estado || RedSocialEstado.ACTIVO
  }
}

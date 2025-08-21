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

export const RedSocialEstado = {
  ACTIVO: 'ACTIVO',
  INACTIVO: 'INACTIVO',
}

@Check(UtilService.buildStatusCheck(RedSocialEstado))
@Entity({ name: 'redes_sociales', schema: process.env.DB_SCHEMA_PORTAFOLIO })
export class RedSocial extends AuditoriaEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string

  @Column({ length: 50, type: 'varchar', comment: 'Nombre de la red social' })
  nombre: string

  @Column({ length: 255, type: 'varchar', comment: 'URL del perfil' })
  url: string

  @Column({
    name: 'id_usuario',
    type: 'uuid',
    nullable: false,
    comment: 'clave foránea que referencia la tabla de Usuarios',
  })
  idUsuario: string

  @ManyToOne(() => Usuario, (usuario) => usuario.redesSociales, {
    nullable: false,
  })
  @JoinColumn({
    name: 'id_usuario',
    referencedColumnName: 'id',
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

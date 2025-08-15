import { USUARIO_SISTEMA } from '@/common/constants'
import { TextService } from '@/common/lib/text.service'
import { UsuarioRol } from '@/core/authorization/entity/usuario-rol.entity'
import { RolEnum } from '@/core/authorization/rol.enum'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class usuarioRol1611516017924 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const items = [
      {
        // id: '1',
        rol: TextService.textToUuid(RolEnum.ADMINISTRADOR), //TextService.textToUuid(RolEnum.ADMINISTRADOR),
        usuario: TextService.textToUuid('ADMINISTRADOR'),
      },
    ]
    const usuariosRoles = items.map((item) => {
      return new UsuarioRol({
        idRol: item.rol,
        idUsuario: item.usuario,
        estado: 'ACTIVO',
        transaccion: 'SEEDS',
        usuarioCreacion: USUARIO_SISTEMA,
      })
    })
    await queryRunner.manager.save(usuariosRoles)
  }

  /* eslint-disable */
  public async down(queryRunner: QueryRunner): Promise<void> {}
}

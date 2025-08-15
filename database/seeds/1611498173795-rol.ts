import { USUARIO_SISTEMA } from '@/common/constants'
import { TextService } from '@/common/lib/text.service'
import { Rol } from '@/core/authorization/entity/rol.entity'
import { RolEnum } from '@/core/authorization/rol.enum'
import { MigrationInterface, QueryRunner } from 'typeorm'


export class rol1611498173795 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const items = [
      {
        rol: RolEnum.ADMINISTRADOR,
        nombre: 'Administrador',
      },
    ]
    const roles = items.map((item) => {
      return new Rol({
        id: TextService.textToUuid(item.rol),
        rol: item.rol,
        nombre: item.nombre,
        estado: 'ACTIVO',
        transaccion: 'SEEDS',
        usuarioCreacion: USUARIO_SISTEMA,
      })
    })
    await queryRunner.manager.save(roles)
  }

  /* eslint-disable */
  public async down(queryRunner: QueryRunner): Promise<void> {}
}

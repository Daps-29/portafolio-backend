import { MigrationInterface, QueryRunner } from 'typeorm'

import dayjs from 'dayjs'
import { TextService } from '@/common/lib/text.service'
import { Genero, TipoDocumento, USUARIO_SISTEMA } from '@/common/constants'
import { Persona } from '@/core/usuario/entity/persona.entity'
import { Usuario } from '@/core/usuario/entity/usuario.entity'

export class usuario1611171041790 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const DEFAULT_PASS = '123'
    const pass = await TextService.encrypt(DEFAULT_PASS)
    const items = [
      {
        usuario: 'ADMINISTRADOR',
        correoElectonico: 'test@gmail.com',
        persona: {
          id: TextService.textToUuid('12345678'),
          nombres: 'DAVID',
          primerApellido: 'PINTO',
          segundoApellido: 'SAAVEDRA',
          tipoDocumento: TipoDocumento.CI,
          nroDocumento: '1324687',
          fechaNacimiento: '1999-12-30',
          genero: Genero.MASCULINO,
        },
      },
    ]

    for (const item of items) {
      const persona = new Persona({
        fechaNacimiento: dayjs(
          item.persona.fechaNacimiento,
          'YYYY-MM-DD'
        ).toDate(),
        genero: item.persona.genero,
        nombres: item.persona.nombres,
        nroDocumento: item.persona.nroDocumento,
        primerApellido: item.persona.primerApellido,
        segundoApellido: item.persona.segundoApellido,
        tipoDocumento: item.persona.tipoDocumento,
        estado: 'ACTIVO',
        transaccion: 'SEEDS',
        usuarioCreacion: USUARIO_SISTEMA,
      })
      const personaResult = await queryRunner.manager.save(persona)
      const usuario = new Usuario({
        id: TextService.textToUuid(item.usuario),
        contrasena: pass,
        intentos: 0,
        usuario: item.usuario,
        correoElectronico: item.correoElectonico,
        idPersona: personaResult.id,
        estado: 'ACTIVO',
        transaccion: 'SEEDS',
        usuarioCreacion: USUARIO_SISTEMA,
      })
      await queryRunner.manager.save(usuario)
    }
  }

  /* eslint-disable */
  public async down(queryRunner: QueryRunner): Promise<void> {}
}

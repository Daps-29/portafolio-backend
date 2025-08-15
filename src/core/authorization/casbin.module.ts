import { Module, Global } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { newEnforcer, Enforcer } from 'casbin'
import TypeORMAdapter from 'typeorm-adapter'
import { join } from 'path'
import { CASBIN_ENFORCER } from './casbin.tokens'

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: CASBIN_ENFORCER,
      useFactory: async (configService: ConfigService): Promise<Enforcer> => {
        const adapter = await TypeORMAdapter.newAdapter({
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          schema: configService.get('DB_SCHEMA_USUARIOS'),
          logging:
            configService.get('NODE_ENV') === 'development' &&
            configService.get('LOG_SQL') === 'true',
          synchronize: false,
        })
  const modelPath = join(__dirname, '../config/authorization/model.conf')
  const enforcer = await newEnforcer(modelPath, adapter)
        enforcer.enableLog(false)
        await enforcer.loadPolicy()
        return enforcer
      },
      inject: [ConfigService],
    },
  ],
  exports: [CASBIN_ENFORCER],
})
export class CasbinModule {}

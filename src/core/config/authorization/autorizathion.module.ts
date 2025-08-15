import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CasbinModule } from '../../authorization/casbin.module'

@Module({
  imports: [ConfigModule, CasbinModule],
})
export class AuthorizationConfigModule {}

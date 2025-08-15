import { Module } from '@nestjs/common'
import { DataBaseModule } from './database/database.module'
import { AuthorizationConfigModule } from './authorization/autorizathion.module'

@Module({
  imports: [DataBaseModule, AuthorizationConfigModule],
})
export class ConfigCoreModule {}

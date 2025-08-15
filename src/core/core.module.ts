import { Module } from '@nestjs/common'
import { ConfigCoreModule } from './config/config.module'
import { AuthenticationModule } from './authentication/authentication.module'
import { AuthorizationModule } from './authorization/authorization.module'

@Module({
  imports: [ConfigCoreModule, AuthenticationModule, AuthorizationModule],
})
export class CoreModule {}

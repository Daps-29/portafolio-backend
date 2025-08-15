import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { AuthenticationService } from '../service/authentication.service'
import { LoggerService } from '../../../core/logger/classes'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  protected logger = LoggerService.getInstance()

  constructor(private readonly autenticacionService: AuthenticationService) {
    super({
      usernameField: 'usuario',
      passwordField: 'contrasena',
    })
  }

  // eslint-disable-next-line no-undef
  async validate(username: string, password: string): Promise<PassportUser> {
    const usuario = await this.autenticacionService.validarUsuario(
      username,
      password
    )
    if (!usuario) {
      throw new UnauthorizedException()
    }
    return { id: usuario.id, roles: usuario.roles }
  }
}

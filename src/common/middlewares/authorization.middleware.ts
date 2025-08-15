import { Inject, Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { Enforcer } from 'casbin'
import { CASBIN_ENFORCER } from '../../core/authorization/casbin.tokens'

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
  constructor(@Inject(CASBIN_ENFORCER) private readonly enforcer: Enforcer) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { originalUrl: resource, method: action } = req
    // obtener rol del token
    const rol = 'ADMINISTRADOR'
    const isValid = await this.enforcer.enforce(rol, resource, action)
    if (!isValid) {
      return res.status(403).json({ mensaje: 'No autorizado' })
    }
    next()
  }
}

import { LoggerService } from '../../core/logger/classes'

export class BaseService {
  protected logger: LoggerService

  constructor() {
    this.logger = LoggerService.getInstance()
  }
}

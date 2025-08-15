import { LoggerService } from '../../core/logger/classes'
import { BaseEntity, DataSource, EntityManager, EntityTarget } from 'typeorm'

export class BaseRepository<E extends BaseEntity> {
  protected dataSource: DataSource
  protected logger: LoggerService
  protected entityTarget: EntityTarget<E>

  constructor(dataSource: DataSource, entityTarget: EntityTarget<E>) {
    this.dataSource = dataSource
    this.entityTarget = entityTarget
    this.logger = LoggerService.getInstance()
  }

  runTransaction<E>(op: (entityManager: EntityManager) => Promise<E>) {
    return this.dataSource.transaction<E>(op)
  }
}

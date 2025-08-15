import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ParametroController } from './controller'
import { ParametroService } from './service'
import { ParametroRepository } from './repository'
import { Parametro } from './entity'

@Module({
  controllers: [ParametroController],
  providers: [ParametroService, ParametroRepository],
  exports: [ParametroService, ParametroRepository],
  imports: [TypeOrmModule.forFeature([Parametro])],
})
export class ParametroModule {}

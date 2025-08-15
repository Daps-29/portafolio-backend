import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { SQLLogger } from '../../logger/utilities'
import { LoggerService } from '../../logger/classes'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        // eslint-disable-next-line no-undef
        entities: [__dirname + '../../../../**/*.entity{.ts,.js}'],
        keepConnectionAlive: true,
        synchronize: false,
        logger: new SQLLogger({
          logger: LoggerService.getInstance(),
          level: {
            query: configService.get('LOG_SQL') === 'true',
            error: true,
          },
        }),
      }),
    }),
  ],
})
export class DataBaseModule {}

import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import dotenv from 'dotenv'
import { DataSource } from 'typeorm'
import packageJson from '../package.json'
import { ConfigService } from '@nestjs/config'
import session from 'express-session'
import { TypeormStore } from 'connect-typeorm'
import helmet from 'helmet'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import express from 'express'
import { ValidationPipe } from '@nestjs/common'
import { printInfo, printLogo } from './core/logger/tools'
import { LoggerModule } from './core/logger/classes'
import { Session } from './core/authentication/entity/session.entity'
dotenv.config()
import process from 'process'

export const SessionAppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  schema: process.env.DB_SCHEMA,
  synchronize: false,
  // eslint-disable-next-line no-undef
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
})

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  })

  await LoggerModule.initialize(app)

  const configService = app.get(ConfigService)

  await SessionAppDataSource.initialize()

  // configuration app
  const repositorySession = SessionAppDataSource.getRepository(Session)

  app.use(
    session({
      secret: configService.get('SESSION_SECRET') || '',
      resave: false,
      saveUninitialized: false,
      rolling: true,
      name: 'base.connect.sid',
      cookie: {
        maxAge: 30 * 60 * 1000,
        httpOnly: true,
      },
      store: new TypeormStore({ ttl: 3600, cleanupLimit: 2 }).connect(
        repositorySession
      ),
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(cookieParser())
  app.use(express.static('public'))
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  })
  app.use(helmet.hidePoweredBy())
  app.use(helmet())
  app.setGlobalPrefix(configService.get('PATH_SUBDOMAIN') || 'api')
  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  const port = configService.get('PORT')
  await app.listen(port)

  printLogo()
  printInfo({
    env: String(process.env.NODE_ENV),
    name: packageJson.name,
    port: port,
    version: packageJson.version,
  })
}

bootstrap()

import { COLOR } from '../constants'
import { LoggerService } from '../classes'
import { stdoutWrite } from '../tools'
import { AppInfo } from '../types'
import { getIPAddress } from '../utilities'
import dayjs from 'dayjs'

export function printInfo(appInfo: AppInfo) {
  const logger = LoggerService.getInstance()

  const appName = appInfo.name
  const appVersion = appInfo.version
  const nodeEnv = appInfo.env
  const port = appInfo.port
  const appLocalUrl = `http://localhost:${port}`
  const appNetworkUrl = `http://${getIPAddress()}:${port}`
  const now = dayjs().format('DD/MM/YYYY HH:mm:ss:SSS')
  const displayName = process.env.APP_BRAND || 'PORTAFOLIO'

  logger.auditInfo('application', {
    mensaje: 'Servicio desplegado',
    metadata: {
      app: appName,
      version: appVersion,
      entorno: nodeEnv,
      urlLocal: appLocalUrl,
      urlRed: appNetworkUrl,
      fecha: now,
    },
    formato: `� ${displayName} v${appVersion}`,
  })

  // Futuristic console block
  const C1 = COLOR.LIGHT_CYAN
  const C2 = COLOR.LIGHT_BLUE
  const C3 = COLOR.MAGENTA
  const R = COLOR.RESET

  const pad = (s: string, len: number) => (s + ' '.repeat(len)).slice(0, len)
  const title = `${C1}${displayName}${R}`
  const vx = `${C2}v${appVersion}${R}`
  const env = `${C3}${nodeEnv}${R}`

  const left = `╔══════════════════════════════════════════════════════════╗\n`
  const mid1 = `║  ${title} ${vx}  │  ${env}  │  ${now}           ║\n`
  const mid2 = `║  Local   ▶ ${appLocalUrl}                      ║\n`
  const mid3 = `║  Network ▶ ${appNetworkUrl}                    ║\n`
  const right = `╚══════════════════════════════════════════════════════════╝\n`

  stdoutWrite(`${C2}${left}${R}`)
  stdoutWrite(`${mid1}`)
  stdoutWrite(`${mid2}`)
  stdoutWrite(`${mid3}`)
  stdoutWrite(`${C2}${right}${R}`)
}

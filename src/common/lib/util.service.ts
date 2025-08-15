import { Injectable } from '@nestjs/common'
import { PathResources } from '../constants'
import { Buffer } from 'buffer'
import process from 'process'
import dayjs from 'dayjs'
@Injectable()
export class UtilService {
  /**
   * Devuelve una expresión SQL para validar el campo estado de un modelo
   * @param items {object} Conjunto de valores.
   * @returns {string} expresión SQL
   * @example
   * enum PersonaEstadoEnum {
   *   ACTIVO = 'ACTIVO',
   *   INACTIVO = 'INACTIVO',
   * }
   * const expression = UtilService.buildCheck(PersonaEstadoEnum)
   * // expression = "_estado IN ('ACTIVO', 'INACTIVO')"
   */
  static buildStatusCheck(items: object = {}): string {
    return UtilService.buildCheck('_estado', items)
  }

  /**
   * Devuelve una expresión SQL para validar tipos enumerados (Se utiliza con el decorador `@Check()`)
   * @param field {string} Nombre del campo de la tabla (tal y como se encuentra definido en la base de datos)
   * @param items {object} Conjunto de valores.
   * @returns {string} expresión SQL
   * @example
   * enum PersonaTipoDocumentoEnum {
   *   CI = 'CI',
   *   PASAPORTE = 'PASAPORTE',
   * }
   * const expression = UtilService.buildCheck('tipo_documento', PersonaTipoDocumentoEnum)
   * // expression = "tipo_documento IN ('CI', 'PASAPORTE')"
   * @example
   * const PersonaTipoDocumento = {
   *   CI: 'CI',
   *   PASAPORTE: 'PASAPORTE',
   * }
   * const expression = UtilService.buildCheck('tipo_documento', PersonaTipoDocumento)
   * // expression = "tipo_documento IN ('CI', 'PASAPORTE')"
   */
  static buildCheck(field: string, items: object = {}): string {
    const values = Object.keys(items).map((k) => items[k])
    if (values.length === 0) {
      throw new Error('[buildCheck] Debe especificarse al menos un item')
    }
    return `${field} IN ('${values.join(`','`)}')`
  }

  static obtenerPath(resource: PathResources) {
    const basePath = this.obtenerUrl(process.env.STORAGE_NFS_PATH || '')
    return resource === PathResources.DEFAULT ? basePath : basePath + resource
  }

  static obtenerUrl(url?: string, withSlash = true): string {
    if (!url || url.length === 0) return withSlash ? '/' : ''
    const hasSlash = url[url.length - 1] === '/'
    if ((withSlash && hasSlash) || (!withSlash && !hasSlash)) return url
    if (withSlash && !hasSlash) {
      return `${url}/`
    }
    if (!withSlash && hasSlash) {
      const urlArr = Array.from(url)
      urlArr.pop()
      return urlArr.join('')
    }
    return `${url}`
  }

  static normalizarNombreArchivo(nombre: string): string {
    return Buffer.from(`${nombre}`, 'latin1').toString('utf-8')
  }

  static alertaDiasExpiracion(
    fechaExpiracion: string | Date,
    diasAlerta: number
  ): {
    isExpiracion: boolean
    diasRestantes: number
    estaExpirado: boolean
  } {
    const fechaActual = dayjs()
    const fechaExp = dayjs(fechaExpiracion)
    const fechaLimiteAlerta = fechaExp.subtract(diasAlerta, 'day')

    const isExpiracion =
      (fechaActual.isAfter(fechaLimiteAlerta) ||
        fechaActual.isSame(fechaLimiteAlerta)) &&
      fechaActual.isBefore(fechaExp.add(1, 'day'))

    const diasRestantes = fechaExp.diff(fechaActual, 'day')
    const estaExpirado =
      fechaActual.isSame(fechaExp.add(1, 'day')) ||
      fechaActual.isAfter(fechaExp.add(1, 'day'))

    return { isExpiracion, diasRestantes, estaExpirado }
  }
}

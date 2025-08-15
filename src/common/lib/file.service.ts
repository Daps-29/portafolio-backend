import path from 'path'
import fs from 'fs'
import mkdirp from 'mkdirp'
import { Injectable } from '@nestjs/common'
import { Buffer } from 'buffer'
@Injectable()
export class FileService {
  /**
   * Indica si es un archivo.
   * @param {String} filePath - Ruta del archivo.
   * @return {Promise<boolean>}
   */
  static existFile = async (filePath: string): Promise<boolean> => {
    try {
      const stats: fs.Stats = await new Promise((resolve, reject) =>
        fs.stat(filePath, (err, stats) => (err ? reject(err) : resolve(stats)))
      )
      return stats.isFile()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      return false
    }
  }

  /**
   * Indica si es un directorio.
   * @param {String} filePath - Ruta del directorio.
   * @return {Promise<boolean>}
   */
  static isDirectory = async (filePath: string): Promise<boolean> => {
    try {
      const stats: fs.Stats = await new Promise((resolve, reject) =>
        fs.stat(filePath, (err, stats) => (err ? reject(err) : resolve(stats)))
      )
      return stats.isDirectory()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      return false
    }
  }

  /**
   * Devuelve el contenido de un archivo de texto.
   * @param {String} filePath - Ruta del archivo.
   * @param encoding
   * @return {String} contenido del archivo.
   */
  static readFile = async (
    filePath: string,
    // eslint-disable-next-line no-undef
    encoding: BufferEncoding = 'utf-8'
  ): Promise<string> => {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, { encoding }, (err, data) =>
        err ? reject(err) : resolve(data)
      )
    })
  }

  static readFileWithoutEncoding = (filePath: string): Promise<Buffer> => {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, (err, data: Buffer) =>
        err ? reject(err) : resolve(data)
      )
    })
  }

  /**
   * Crea un archivo.
   * @param {String} filePath - Ruta del archivo.
   * @param {String} content  - Contenido del archivo.
   */
  static writeFile = async (
    filePath: string,
    content: string | Buffer
  ): Promise<void> => {
    await mkdirp(path.dirname(filePath))
    await new Promise((resolve, reject) =>
      fs.writeFile(filePath, content, (err) => (err ? reject(err) : resolve(1)))
    )
  }

  /**
   * Elimina un archivo.
   * @param {String} filePath - Ruta del archivo.
   */
  static removeFile = async (filePath: string) => {
    if (await FileService.existFile(filePath)) {
      await new Promise((resolve, reject) =>
        fs.unlink(filePath, (err) => (err ? reject(err) : resolve(1)))
      )
    }
  }

  /**
   * Devuelve una lista de archivos dentro de un directorio.
   * @param {String} dirPath - Ruta del directorio.
   */
  static readdir = async (dirPath: string): Promise<string[]> => {
    return new Promise((resolve, reject) =>
      fs.readdir(dirPath, (err, files) => (err ? reject(err) : resolve(files)))
    )
  }

  /**
   * Crea un directorio de manera recursiva
   * @param {String} dirPath - Ruta del directorio.
   */
  static createDir = async (dirPath: string) => {
    await mkdirp(dirPath)
  }

  /**
   * Devuelve metadatos del archivo o directorio
   * @param {String} filePath - Ruta del archivo o directorio.
   */
  static stat = async (filePath: string): Promise<fs.Stats> => {
    return await new Promise((resolve, reject) =>
      fs.stat(filePath, (err, stats) => (err ? reject(err) : resolve(stats)))
    )
  }

  /**
   * Copia archivos
   * @param {String} source Ruta del archivo origen
   * @param {String} target Ruta del archivo destino
   */
  static copyFile(source: string, target: string) {
    return new Promise((resolve, reject) =>
      fs.copyFile(source, target, (err) => (err ? reject(err) : resolve(1)))
    )
  }
}

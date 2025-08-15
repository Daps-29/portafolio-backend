import { extname } from 'path'
import { v4 as uuid } from 'uuid'
import { UtilService } from './util.service'

export const editarNombreArchivo = (req, file, callback) => {
  const extencionArchivo = extname(file.originalname)
  file.originalname = UtilService.normalizarNombreArchivo(file.originalname)
  callback(null, `${uuid()}${extencionArchivo}`)
}

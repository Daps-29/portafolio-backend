// import * as dayjs from 'dayjs'
// import * as utc from 'dayjs/plugin/utc'
// import * as localizedFormat from 'dayjs/plugin/localizedFormat'
// import * as customParseFormat from 'dayjs/plugin/customParseFormat'

import dayjs from 'dayjs'

// dayjs.extend(utc)
// dayjs.extend(localizedFormat)
// dayjs.extend(customParseFormat)

export class DateService {
  static verifyBeforeDate = (date: number): boolean => {
    return date < dayjs().valueOf()
  }

  static convertirTiempo(segundos: number) {
    const dias = Math.floor(segundos / (24 * 3600)) // 1 día = 24 horas * 3600 segundos
    segundos %= 24 * 3600
    const horas = Math.floor(segundos / 3600) // 1 hora = 3600 segundos
    segundos %= 3600
    const minutos = Math.floor(segundos / 60) // 1 minuto = 60 segundos
    segundos %= 60
    return { dias, horas, minutos, segundos }
  }
  static getDate(fecha) {
    return fecha ? dayjs(fecha) : dayjs()
  }
  static getActualDate() {
    return dayjs()
  }

  static parseDateString(fecha: string) {
    return dayjs(fecha, 'DD/MM/YYYY hh:mm:ss A')
  }

  static getDateType(fecha = null) {
    return (fecha ? dayjs(fecha) : dayjs()).toDate()
  }

  static getDateUnix(fecha = null) {
    return (fecha ? dayjs(fecha) : dayjs()).unix()
  }

  static getExpirationDateUnix(fecha: any, fromCurrentDate = false) {
    let date
    if (!fromCurrentDate) {
      date = dayjs(fecha).endOf('day')
    } else {
      date = dayjs().add(fecha, 'seconds')
    }
    return date.unix()
  }

  static getDateNotAfter1Year() {
    return dayjs().subtract(4, 'hour').endOf('day').add(1, 'year')
  }

  static isLessThanYear(fecha: string) {
    const date = dayjs(fecha).subtract(4, 'hour')
    return date < this.getDateNotAfter1Year()
  }

  static getFormattedDateFromUnix(fecha: number) {
    return dayjs(fecha).format('YYYY-MM-DD')
  }

  static getDateStringFormat(fecha: string) {
    return dayjs(fecha).format('YYYY-MM-DD')
  }
  static getDateDayy(fecha: string) {
    return dayjs(fecha).startOf('day')
  }
  static getDateLocalFormat(fecha: string) {
    return dayjs(fecha).format('DD/MM/YYYY HH:MM:ss')
  }

  static getDateFromLocalString(fecha: string) {
    // const fechaFormat = dayjs(fecha, 'DD/MM/YYYY');
    return dayjs(fecha).format('YYYY-MM-DD HH:MM:ss')
  }
  static getStringToDate(fecha: string) {
    return dayjs(fecha)
  }
  static getFormattedDate(fecha: number) {
    return dayjs(fecha).format('DD-MM-YYYY HH:MM')
  }

  static formatUnixDate(date: number) {
    return dayjs.unix(date).format('DD/MM/YYYY')
  }

  static formatUnixDateToDatetime(date: number) {
    return dayjs.unix(date).format('YYYY-MM-DD HH:mm:ss')
  }

  static getCurrentDate() {
    return dayjs().format('YYYY-MM-DD')
  }
  static getCurrentDateStartDay() {
    return dayjs().startOf('day')
  }
  static diffDateDays(fechaDesde, fechaHasta) {
    return fechaHasta.diff(fechaDesde, 'day', true)
  }
  static addYearsToNow(months) {
    const date = dayjs().add(months, 'year')
    return date.toDate()
  }

  static getStartEndDate(fecha = null, start = false) {
    const date = fecha ? dayjs(fecha) : dayjs()
    const startEnddate = start ? date.startOf('day') : date.endOf('day')
    return startEnddate.unix()
  }

  static formatDate(date) {
    return dayjs(date).format('DD/MM/YYYY LTS')
  }

  static formatDateTLS(date) {
    return dayjs(date, 'DD/MM/YYYY')
      .endOf('day')
      .format('DD/MM/YYYY hh:mm:ss A')
  }

  static getStartEndDateFormat(fecha: string, startDay = false) {
    return startDay
      ? dayjs(fecha, 'YYYY-MM-DD').startOf('day').format()
      : dayjs(fecha, 'YYYY-MM-DD').endOf('day').format()
  }
}

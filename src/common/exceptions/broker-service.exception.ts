import { HttpException, HttpStatus } from '@nestjs/common'
import { Messages } from '../constants/response-messages'

export class BrokerServiceException extends HttpException {
  constructor(error) {
    const errorMessage =
      error?.response?.data ||
      error?.request ||
      error?.message ||
      error?.Error ||
      Messages.EXCEPTION_BROKER_FAIL
    super(errorMessage, HttpStatus.FAILED_DEPENDENCY)
  }
}

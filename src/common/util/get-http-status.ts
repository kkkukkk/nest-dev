import { HttpException, HttpStatus } from '@nestjs/common';

export function getHttpStatus(exception: unknown): HttpStatus {
  if (exception instanceof HttpException) return exception.getStatus();
  else return HttpStatus.INTERNAL_SERVER_ERROR;
}

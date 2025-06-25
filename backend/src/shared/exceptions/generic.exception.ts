import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums/http-status.enum';
import { Result, Severity } from '../models/result.model';

export class GenericException extends HttpException {
  constructor(error: string) {
    super(new Result(Severity.Error, error), HttpStatus.BAD_REQUEST);
  }
}

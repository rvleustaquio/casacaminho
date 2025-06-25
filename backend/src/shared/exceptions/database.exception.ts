import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums/http-status.enum';
import { Result, Severity } from '../models/result.model';

interface DataBaseError {
  code: string;
  message: string;
  constraint: string;
  detail?: string;
}

const dataBaseChecks: Record<string, string> = {
  estados_civis_ukey: 'Já existe um Estado Civil com esta descrição.',
};

export class DataBaseException extends HttpException {
  constructor(error: any) {
    super(
      new Result(
        Severity.Error,
        dataBaseChecks[(error as DataBaseError).constraint] ??
          (error as DataBaseError).message,
      ),
      HttpStatus.BAD_REQUEST,
    );
  }
}

export enum Severity {
  Success = 'success',
  Warning = 'warn',
  Info = 'info',
  Error = 'error',
}

export class Result<T = any> {
  severity: Severity;
  detail: string;
  entity?: T;

  constructor(severity: Severity, detail: string, entity?: T) {
    this.severity = severity;
    this.detail = detail;
    this.entity = entity;
  }
}

import { LocationStrategy } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiService } from './_base-api.service';

export interface EstadoCivil {
  createdBy: string;
  createdAt: Date;
  updatedBy: string;
  updatedAt: Date;
  deletedBy: string;
  deletedAt: Date;
  id: number;
  descricao: string;
}

@Injectable()
export class EstadoCivilService extends BaseApiService<EstadoCivil> {
  constructor(httpClient: HttpClient, locationStrategy: LocationStrategy) {
    super(httpClient, locationStrategy, 'estados-civis');
  }
}

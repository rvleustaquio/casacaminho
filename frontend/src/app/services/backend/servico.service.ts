import { LocationStrategy } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiService } from './_base-api.service';

export interface Servico {
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
export class ServicoService extends BaseApiService<Servico> {
  constructor(httpClient: HttpClient, locationStrategy: LocationStrategy) {
    super(httpClient, locationStrategy, 'servicos');
  }
}

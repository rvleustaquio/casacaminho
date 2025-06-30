import { LocationStrategy } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiService } from './_base-api.service';

export interface SitAssistido {
  createdBy: string;
  createdAt: Date;
  updatedBy: string;
  updatedAt: Date;
  deletedBy: string;
  deletedAt: Date;
  id: number;
  descricao: string;
  ativo: boolean;
}

@Injectable()
export class SitAssistidoService extends BaseApiService<SitAssistido> {
  constructor(httpClient: HttpClient, locationStrategy: LocationStrategy) {
    super(httpClient, locationStrategy, 'sit-assistidos');
  }
}

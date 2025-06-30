import { LocationStrategy } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiService } from './_base-api.service';

export interface Assistido {
  createdBy: string;
  createdAt: Date;
  updatedBy: string;
  updatedAt: Date;
  deletedBy: string;
  deletedAt: Date;
  id: number;
  nome: string;
}

@Injectable()
export class AssistidoService extends BaseApiService<Assistido> {
  constructor(httpClient: HttpClient, locationStrategy: LocationStrategy) {
    super(httpClient, locationStrategy, 'assistidos');
  }
}

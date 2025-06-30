import { LocationStrategy } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiService } from './_base-api.service';

export interface Prazo {
  createdBy: string;
  createdAt: Date;
  updatedBy: string;
  updatedAt: Date;
  deletedBy: string;
  deletedAt: Date;
  id: number;
  meses: number;
}

@Injectable()
export class PrazoService extends BaseApiService<Prazo> {
  constructor(httpClient: HttpClient, locationStrategy: LocationStrategy) {
    super(httpClient, locationStrategy, 'prazos');
  }
}

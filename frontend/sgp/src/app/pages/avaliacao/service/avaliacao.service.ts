import { Injectable } from '@angular/core';
import { Avaliacao } from '../models/avaliacao';
import { ResourceService } from 'src/app/services/resource.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class AvaliacaoService extends ResourceService<Avaliacao>{

  url = `${environment.url}/api/`;

  constructor(private http: HttpClient) {
    super(http, 'avaliacoes')
  }

}

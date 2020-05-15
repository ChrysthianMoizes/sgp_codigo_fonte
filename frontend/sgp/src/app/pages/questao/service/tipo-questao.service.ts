import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResourceService } from 'src/app/services/resource.service';
import { TipoQuestao } from 'src/app/models/tipo-questao';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { SelectItem } from 'primeng';

@Injectable({
  providedIn: 'root'
})
export class TipoQuestaoService {

  private readonly url = '/api/tipos-questao';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) { }

  getTipoQuestoes(): Observable<SelectItem[]>{
    return this.http.get(this.url, this.httpOptions) as Observable<SelectItem[]>;
  }

  getTipoQuestaoById(id: string): Observable<SelectItem>{
    return this.http.get(`${this.url}/${id}`, this.httpOptions) as Observable<SelectItem>;
  }
}

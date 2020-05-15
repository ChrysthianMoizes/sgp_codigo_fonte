import { Injectable } from '@angular/core';
import { ResourceService } from 'src/app/services/resource.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Senioridade } from 'src/app/models/senioridade';
import { SelectItem } from 'primeng';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SenioridadeService {

  url = environment.url + 'questoes';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) { }

  getSenioridades(): Observable<SelectItem[]>{
    return this.http.get(this.url, this.httpOptions) as Observable<SelectItem[]>;
  }

  getSenioridadeById(id: string): Observable<SelectItem>{
    return this.http.get(`${this.url}/${id}`, this.httpOptions) as Observable<SelectItem>;
  }

}

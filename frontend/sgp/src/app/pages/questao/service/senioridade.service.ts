import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {SelectItem} from 'primeng';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SenioridadeService {

  private readonly url = '/api/senioridades';

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
  };

  constructor(private http: HttpClient) {
  }

  index(): Observable<SelectItem[]> {
    return this.http.get(this.url, this.httpOptions) as Observable<SelectItem[]>;
  }

}

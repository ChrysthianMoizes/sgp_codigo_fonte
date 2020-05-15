import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Resource } from '../models/resource.model';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

export class ResourceService<T extends Resource> {
  url = environment.url;
  constructor(
    private httpClient: HttpClient,
    private endpoint: string
  ) { }

  get pathParams() {
    return {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }
  }

  create(item: T): Observable<T> {
    return this.httpClient
      .post<T>(`${this.url}/${this.endpoint}`, item, this.pathParams)
  }

  update(item: T): Observable<T> {
    return this.httpClient
      .put<T>(`${this.url}/${this.endpoint}/${item.id}`, { ...item, id: undefined }, this.pathParams);
  }

  show(id: string): Observable<T> {
    return this.httpClient
      .get(`${this.url}/${this.endpoint}/${id}`, this.pathParams) as Observable<T>;
  }

  index(): Observable<T[]> {
    return this.httpClient
      .get(`${this.url}/${this.endpoint}`, this.pathParams) as Observable<T[]>;
  }

  destroy(id: string) {
    return this.httpClient
      .delete(`${this.url}/${this.endpoint}/${id}`, this.pathParams);
  }
}

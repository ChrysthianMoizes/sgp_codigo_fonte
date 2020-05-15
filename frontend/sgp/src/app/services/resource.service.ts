import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Resource } from '../models/resource.model';

export class ResourceService<T extends Resource> {

  constructor(
    private httpClient: HttpClient,
    private url: string
  ) { }

  create(item: T): Observable<T> {
    return this.httpClient
      .post<T>(`${this.url}`, item)
  }

  update(item: T): Observable<T> {
    return this.httpClient
      .put<T>(`${this.url}`, item);
  }

  show(id: string): Observable<T> {
    return this.httpClient.get(`${this.url}/${id}`) as Observable<T>;
  }

  index(): Observable<T[]> {
    return this.httpClient.get<T[]>(`${this.url}`) as Observable<T[]>;
  }

  destroy(id: string) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
}

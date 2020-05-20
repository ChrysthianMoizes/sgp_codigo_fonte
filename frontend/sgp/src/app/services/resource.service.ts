import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Resource } from '../models/resource.model';
import { Pageable } from '../util/pageable-request';

export class ResourceService<T extends Resource> {
  constructor(private httpClient: HttpClient, protected url: string) { }

  create(item: T): Observable<T> {
    return this.httpClient.post<T>(`${this.url}`, item);
  }

  update(item: T): Observable<T> {
    return this.httpClient.put<T>(`${this.url}`, item);
  }

  show(id: number): Observable<T> {
    return this.httpClient.get(`${this.url}/${id}`) as Observable<T>;
  }

  index(filtro: any, pageable: Pageable<T>): Observable<Pageable<T>> {
    return this.httpClient.get(`${this.url}`, {
      params: Object.assign(filtro, pageable),
    }) as Observable<Pageable<T>>;
  }

  destroy(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
}

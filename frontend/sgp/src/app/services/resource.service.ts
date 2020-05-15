import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Resource } from '../models/resource.model';
import { Page } from '../models/page.model';

export class ResourceService<T extends Resource> {
  constructor(private httpClient: HttpClient, private url: string) {}

  create(item: T): Observable<T> {
    return this.httpClient.post<T>(`${this.url}`, item);
  }

  update(item: T): Observable<T> {
    return this.httpClient.put<T>(`${this.url}`, item);
  }

  show(id: string): Observable<T> {
    return this.httpClient.get(`${this.url}/${id}`) as Observable<T>;
  }

  index(): Observable<Page<T>> {
    return this.httpClient.get(`${this.url}`) as Observable<Page<T>>;
  }

  destroy(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
}

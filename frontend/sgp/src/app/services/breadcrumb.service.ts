import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  private crumbs: Subject<MenuItem[]>
  crumbs$: Observable<MenuItem[]>;

  constructor() {
    this.crumbs = new Subject<MenuItem[]>();
    this.crumbs$ = this.crumbs.asObservable();
  }

  setCrumbs(items: MenuItem[]) {
    this.crumbs.next(
      (items || []).map(item =>
          Object.assign({}, item, {
            routerLinkActiveOptions: { exact: true }
          })
        )
    );
  }
}

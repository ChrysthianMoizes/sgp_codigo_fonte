import {Injectable} from '@angular/core';
import {MenuItem} from 'primeng';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  crumbs$: Observable<MenuItem[]>;
  private crumbs: Subject<MenuItem[]>;

  constructor() {
    this.crumbs = new Subject<MenuItem[]>();
    this.crumbs$ = this.crumbs.asObservable();
  }

  setCrumbs(items: MenuItem[]) {
    this.crumbs.next(
      (items || []).map(item =>
        Object.assign({}, item, {
          routerLinkActiveOptions: {exact: true}
        })
      )
    );
  }
}

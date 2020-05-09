import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  OnChanges,
} from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';
import { Observable } from 'rxjs';
import { BreadcrumbService } from 'src/app/components/breadcrumb/breadcrumb.service';
import { isNullOrUndefined } from 'util';
import { filter, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
})
export class BreadcrumbComponent implements OnInit {
  showBreadCrumb: boolean = true;
  menuItems: MenuItem[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  @Output() shownavbar = new EventEmitter();

  static readonly ROUTE_DATA_BREADCRUMB = 'breadcrumb';
  static readonly ROUTE_DATA_TOPLAYOUT = 'toplayout';

  ngOnInit(): void {
    this.menuItems = this.createBreadcrumbs(this.activatedRoute.root)
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(
      () => this.menuItems = this.createBreadcrumbs(this.activatedRoute.root)
    );
  }

  private createBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: MenuItem[] = []
  ): MenuItem[] {
    const children: ActivatedRoute[] = route.children;
    if (children.length === 0) {
      breadcrumbs.unshift({ label: 'Página Inicial', url: '/home' });
      return breadcrumbs;
    }

    for (let child of children) {
      const routeURL: string = child.snapshot.url
        .map((segment) => segment.path)
        .join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }
      const label = child.snapshot.data[BreadcrumbComponent.ROUTE_DATA_BREADCRUMB];
      this.showBreadCrumb = child.snapshot.data[BreadcrumbComponent.ROUTE_DATA_TOPLAYOUT];
      this.shownavbar.emit(
        child.snapshot.data[BreadcrumbComponent.ROUTE_DATA_TOPLAYOUT]
      );
      if (!isNullOrUndefined(label) && label != 'Home') {
        breadcrumbs.push({ label, url });
      }

      return this.createBreadcrumbs(child, url, breadcrumbs);
    }
  }
}

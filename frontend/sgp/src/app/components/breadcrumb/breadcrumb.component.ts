import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { BreadcrumbService } from 'src/app/components/breadcrumb/breadcrumb.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
})
export class BreadcrumbComponent implements OnInit {

  static readonly ROUTE_DATA_BREADCRUMB = 'breadcrumb';
  static readonly ROUTE_DATA_TOPLAYOUT = 'toplayout';
  menuItems: MenuItem[];
  crumbs$: Observable<MenuItem[]>;
  showBreadCrumb: boolean = true;

  @Output() shownavbar = new EventEmitter();

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.menuItems = this.createBreadcrumbs(this.activatedRoute.root);
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(
        () =>
          (this.menuItems = this.createBreadcrumbs(this.activatedRoute.root))
      );
  }

  refresh() {
    this.ngOnInit();
  }

  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: MenuItem[] = []): MenuItem[] {
    const children: ActivatedRoute[] = route.children;
    if (children.length === 0) {
      breadcrumbs.unshift({ label: 'Página Inicial', routerLink: '/home' })
      return breadcrumbs;
    }

    for (let child of children) {
      const routeURL: string = child.snapshot.url
        .map((segment) => segment.path)
        .join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }
      const label =
        child.snapshot.data[BreadcrumbComponent.ROUTE_DATA_BREADCRUMB];
      this.showBreadCrumb =
        child.snapshot.data[BreadcrumbComponent.ROUTE_DATA_TOPLAYOUT];
      this.shownavbar.emit(
        child.snapshot.data[BreadcrumbComponent.ROUTE_DATA_TOPLAYOUT]
      );
      if (!isNullOrUndefined(label) && label != 'Home') {
        breadcrumbs.push({ label: label, routerLink: url });
      }

      return this.createBreadcrumbs(child, url, breadcrumbs);
    }
  }
}

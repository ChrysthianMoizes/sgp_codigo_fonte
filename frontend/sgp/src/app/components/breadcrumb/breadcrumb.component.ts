import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MenuItem} from 'primeng/api/menuitem';
import {Observable} from 'rxjs';
import {BreadcrumbService} from 'src/app/components/breadcrumb/breadcrumb.service';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  static readonly ROUTE_DATA_BREADCRUMB = 'breadcrumb';
  static readonly ROUTE_DATA_TOPLAYOUT = 'toplayout';
  crumbs$: Observable<MenuItem[]>;
  showBreadCrumb = true;
  @Output() shownavbar = new EventEmitter();

  constructor(private breadcrumb: BreadcrumbService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.breadcrumb.setCrumbs(this.createBreadcrumbs(this.activatedRoute.root));
    });
    this.crumbs$ = this.breadcrumb.crumbs$;
  }

  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: MenuItem[] = []): MenuItem[] {
    const children: ActivatedRoute[] = route.children;
    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const label = child.snapshot.data[BreadcrumbComponent.ROUTE_DATA_BREADCRUMB];
      this.showBreadCrumb = child.snapshot.data[BreadcrumbComponent.ROUTE_DATA_TOPLAYOUT];
      this.shownavbar.emit(child.snapshot.data[BreadcrumbComponent.ROUTE_DATA_TOPLAYOUT]);
      if (!isNullOrUndefined(label)) {
        breadcrumbs.push({label, url});
      }

      return this.createBreadcrumbs(child, url, breadcrumbs);
    }
  }
}

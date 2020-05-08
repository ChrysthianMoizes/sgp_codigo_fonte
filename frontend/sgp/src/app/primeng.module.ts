import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {
  AccordionModule,
  ButtonModule,
  CardModule,
  ConfirmDialogModule,
  DataViewModule,
  DialogModule,
  InputTextModule,
  TableModule
} from 'primeng';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {MenuModule} from 'primeng/menu';
import {PaginatorModule} from 'primeng/paginator';
import {PickListModule} from 'primeng/picklist';
import {ToastModule} from 'primeng/toast';

const modules = [
    ButtonModule,
    CardModule,
    InputTextModule,
    BreadcrumbModule,
    MenuModule,
    PaginatorModule,
    PickListModule,
    ToastModule,
    DataViewModule,
    TableModule,
    DynamicDialogModule,
    AccordionModule,
    ConfirmDialogModule,
    DialogModule,
  ]
;


@NgModule({
  declarations: [],
  imports: [
    CommonModule, ...modules
  ],
  exports: [...modules],
})

export class PrimengModule {
}

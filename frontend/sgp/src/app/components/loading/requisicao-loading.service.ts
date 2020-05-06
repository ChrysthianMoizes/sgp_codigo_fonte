import { Injectable } from '@angular/core';
import { LoadingService } from './loading.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequisicaoLoadingService {
  constructor(private loadingService: LoadingService) {}

  requisicaoLoading() {
    this.loadingService.activate();
    of<string>('nome').subscribe(
      (x) => {
        this.loadingService.deactivate();
      },
      (error) => this.loadingService.deactivate()
    );
  }
}

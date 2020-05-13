import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class RequisicaoLoadingService {
  constructor(private loadingService: LoadingService) {}

  requisicaoLoading(): void {
    this.loadingService.activate();
    of<string>('nome').subscribe(
      (x) => {
        this.loadingService.deactivate();
      },
      (error) => this.loadingService.deactivate()
    );
  }
}

import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot): boolean {
    return true;
    if (!this.authService.containsUsuario()) {
      this.router.navigate(['/login']);
      return false;
    }

    if (next.data.role && !this.authService.temPermissao()) {
      this.router.navigate(['/home']);
      return false;
    }

    return true;
  }
}

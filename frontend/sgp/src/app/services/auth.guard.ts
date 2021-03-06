import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot): boolean {
    if (!this.authService.containsUsuario()) {
      this.router.navigate(['/login']);
      return false;
    }

    if (next.data.role && !this.authService.getUsuario().admin) {
      this.router.navigate(['/home']);
      return false;
    }

    return true;
  }
}

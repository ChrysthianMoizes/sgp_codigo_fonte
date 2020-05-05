import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
    ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if( !this.authService.containsUsuarioSessionStorage() ) {
      this.router.navigate(['/login']);
      return false;
    }

    if(next.data.roles
      && !this.authService.temPermissao(next.data.role)){

      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }

}

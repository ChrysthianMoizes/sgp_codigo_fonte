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

    return true;

    if( !this.authService.containsUsuarioSessionStorage() ) {
      this.router.navigate(['/login']);
      return false;
    }

    if(next.data.roles
      && !this.authService.temUmaDessasPermissoes(next.data.roles)
      ){

      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }

}

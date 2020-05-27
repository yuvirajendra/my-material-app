import { CanActivate,
         ActivatedRouteSnapshot,
         RouterStateSnapshot,
         Router
        } from '@angular/router';
import { LoginService } from './login.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private _loginService: LoginService,
                private _router: Router) {}

    canActivate(activeRoute: ActivatedRouteSnapshot, 
                routerState: RouterStateSnapshot): boolean {
        console.log("Inside CanActivate");
        
        if (this._loginService.isAuthorizedUser()) {
            return true;
        }
        else {
            this._router.navigate(['/login']);
        }

    }

}
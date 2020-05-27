import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map, retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {  
  isAuthorized = new Subject<boolean>();
  objUser: User;

  constructor(private _httpClient: HttpClient, private router: Router) { }

  authenticate(postRequest) {
    var authenticationUrl = environment.authenticationServiceUrl;
    this.objUser = null;

    return this._httpClient.post(authenticationUrl, postRequest).pipe(
      map((response: User) => {
        this.objUser = response;
        console.log("authenticate");
        console.log(this.objUser);
        this.isAuthorized.next(true);
        return response;
      }),
      retry(3),
      catchError(this.errorHandler)
    );
  }

  isAuthorizedUser() {
    console.log("isAuthorizedUser");
    console.log(this.objUser);
    return (null != this.objUser);
  }

  private errorHandler(objError: HttpErrorResponse) {
    console.log(objError.message);
    return throwError(objError);
  }

  onLogout() {
    this.isAuthorized.next(false);
    this.router.navigate(['/login']);
  }
}

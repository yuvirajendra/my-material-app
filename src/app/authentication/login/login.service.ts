import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map, retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class LoginService {  
  isAuthorized = new Subject<boolean>();
  constructor(private _httpClient: HttpClient) { }

  authenticate(postRequest) {
    var authenticationUrl = environment.authenticationServiceUrl;
    this.isAuthorized.next(true);
    return this._httpClient.post(authenticationUrl, postRequest).pipe(
      retry(3),
      catchError(this.errorHandler)
    );
  }

  private errorHandler(objError: HttpErrorResponse) {
    console.log(objError.message);
    return throwError(objError);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map, retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private _httpClient: HttpClient) { }

  authenticate(postRequest) {
    var authenticationUrl = environment.authenticationServiceUrl;

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

import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private _httpClient: HttpClient) { }

  signUp(postRequest) {
    var signUpServiceUrl = environment.signUpServiceUrl;

    return this._httpClient.post(signUpServiceUrl, postRequest).pipe(
      retry(3),
      catchError(this.errorHandler)
    );
  }

  private errorHandler(objError: HttpErrorResponse) {
    console.log(objError.message);
    return throwError(objError);
  }
}
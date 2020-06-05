import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map, retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { AngularFireAuth}  from 'angularfire2/auth';
import { User } from './user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class LoginService {  
  isAuthorized = new Subject<boolean>();
  objUser: any;

  constructor(private _httpClient: HttpClient, 
              private _router: Router,
              private _firebaseAuth: AngularFireAuth,
              private _snackBar: MatSnackBar) { }

  authenticate(postRequest) {
    this.objUser = null;
    console.log(postRequest);

    this._firebaseAuth.auth.signInWithEmailAndPassword(
      postRequest.userId,
      postRequest.password
    ).then(
      result => {
        console.log(result);
        this.isAuthorized.next(true);
        this.objUser = result;
        this._router.navigate(['/training']);     
      }
    ).catch(
      error => {
        console.log(error);
        this._snackBar.open(error.message, null, {duration:5000});
      }
    )
    // var authenticationUrl = environment.authenticationServiceUrl;
    // this.objUser = null;

    // return this._httpClient.post(authenticationUrl, postRequest).pipe(
    //   map((response: User) => {
    //     this.objUser = response;
    //     console.log("authenticate");
    //     console.log(this.objUser);
    //     this.isAuthorized.next(true);
    //     return response;
    //   }),
    //   retry(3),
    //   catchError(this.errorHandler)
    // );
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
    this._firebaseAuth.auth.signOut();
    this._router.navigate(['/login']);
  }
}

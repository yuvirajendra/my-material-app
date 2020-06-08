import { Injectable, ɵgetComponentViewDefinitionFactory } from '@angular/core';
import { environment } from '../../../environments/environment'
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AngularFireAuth }  from 'angularfire2/auth';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from  '@ngrx/store';
import * as fromStoreApp from '../../app.reducer';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private _httpClient: HttpClient,
              private _router: Router,
              private _firebaseAuth: AngularFireAuth,
              private _snackBar: MatSnackBar,
              private _store: Store<{ui_state: fromStoreApp.State}>) { }

  signUp(postRequest) {
    // var signUpServiceUrl = environment.signUpServiceUrl;

    // return this._httpClient.post(signUpServiceUrl, postRequest).pipe(
    //   retry(3),
    //   catchError(this.errorHandler)
    // );
    this._store.dispatch({type: 'START_LOADING'});
    console.log(postRequest);
    this._firebaseAuth.auth.createUserWithEmailAndPassword(
      postRequest.email,
      postRequest.password
    ).then(
      result => {
        console.log(result);
        this._store.dispatch({type: 'STOP_LOADING'});
        this._router.navigate(['/login']);     
      }
    ).catch(
      error => {
        console.log(error);
        this._store.dispatch({type: 'STOP_LOADING'});
        this._snackBar.open(error.message, null, {duration:5000});
      }
    )
  }

  private errorHandler(objError: HttpErrorResponse) {
    console.log(objError.message);
    return throwError(objError);
  }
}
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromStoreApp from '../../app.reducer';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading$: Observable<boolean>; 
  // Observable type variable to subscribe the event from Store
  // $ sign is convention of ngRx
  constructor(private _loginService: LoginService, 
              private router: Router,
              private _store: Store<{ui_state: fromStoreApp.State}>) { }

  ngOnInit(): void {
    this.isLoading$ = this._store.map(
      state => 
        state.ui_state.isLoading);
  }

  submitLoginForm(objLoginForm: NgForm) {
    console.log("Inside Login Submit");
    console.log(objLoginForm.form.value);
    this._loginService.authenticate(objLoginForm.form.value);
    // .subscribe(
    //   loginResponse => {
    //     console.log(loginResponse);        
    //     this.router.navigate(['/training']);
    //   }
    // )
  }
}
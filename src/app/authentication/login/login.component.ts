import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private _loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  submitLoginForm(objLoginForm: NgForm) {
    console.log("Inside Login Submit");
    console.log(objLoginForm.form.value);
    this._loginService.authenticate(objLoginForm.form.value).subscribe(
      loginResponse => {
        console.log(loginResponse);        
        this.router.navigate(['/training']);
      }
    )
  }
}
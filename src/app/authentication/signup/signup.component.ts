import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  submitSignUpForm(objSignUpForm: NgForm) {
    console.log("Inside SignUp Submit");
    console.log(objSignUpForm);
  }

}

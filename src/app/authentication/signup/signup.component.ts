import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  minAge;
  maxAge;

  constructor() { }

  ngOnInit(): void {
    this.minAge = new Date(); /* This will return the current date */
    this.maxAge = new Date();
    this.maxAge.setFullYear(this.maxAge.getFullYear() - 18); /* This will subtract 18 years from Current date */
    this.minAge.setFullYear(this.minAge.getFullYear() - 50); /* This will subtract 50 years from Current date */
    console.log("Max Age: " + this.maxAge);
    console.log("Min Age: " + this.minAge);
  }

  submitSignUpForm(objSignUpForm: NgForm) {
    console.log("Inside SignUp Submit");
    console.log(objSignUpForm);
  }

}

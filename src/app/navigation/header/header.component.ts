import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { LoginService } from 'src/app/authentication/login/login.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sideNavToggle = new EventEmitter();
  isAuth:boolean = false;
  authSubscription: Subscription;

  constructor(private _loginService: LoginService) { }

  ngOnInit(): void {
    this.authSubscription = this._loginService.isAuthorized.subscribe(
      result => {
        this.isAuth = result;
      }
    );
  }

  toggle(): void {
    console.log("Output Directive");
    this.sideNavToggle.emit();
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { LoginService } from 'src/app/authentication/login/login.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() sideNavClose = new EventEmitter();
  objAuthSubscription: Subscription;
  isAuth: boolean = false;

  constructor(private _loginService: LoginService) { }

  ngOnInit(): void {
    this.callLoginService();
  }
  
  onLogout(): void {
    this.onClose();
    this._loginService.onLogout();    
  }

  onClose(): void {
    console.log("Side Nav Close");
    this.sideNavClose.emit();
  }

  ngOnDestroy() {
    this.objAuthSubscription.unsubscribe();
  }

  callLoginService() {
    this.objAuthSubscription = this._loginService.isAuthorized.subscribe(
      result => {
        this.isAuth = result;
      }
    );
  }
}

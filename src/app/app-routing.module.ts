import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './authentication/signup/signup.component';
import { MaterialComponent } from './material/material.component';
import { LoginComponent } from './authentication/login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { TrainingComponent } from './training/training.component';
import { AuthGuard } from './authentication/login/auth.guard';

const routes: Routes = [
  {path: 'signup', component: SignupComponent},
  {path: 'login', component:LoginComponent},
  {path: 'material', component: MaterialComponent, canActivate: [AuthGuard]},
  {path: 'home', component: WelcomeComponent, canActivate: [AuthGuard]},
  {path: 'training', component: TrainingComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
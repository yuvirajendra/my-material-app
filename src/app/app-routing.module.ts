import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './authentication/signup/signup.component';
import { MaterialComponent } from './material/material.component';
import { LoginComponent } from './authentication/login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { TrainingComponent } from './training/training.component';

const routes: Routes = [
  {path: 'signup', component: SignupComponent},
  {path: 'login', component:LoginComponent},
  {path: 'material', component: MaterialComponent},
  {path: 'home', component: WelcomeComponent},
  {path: 'training', component: TrainingComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
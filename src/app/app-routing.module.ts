import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './authentication/signup/signup.component';
import { MaterialComponent } from './material/material.component';


const routes: Routes = [
  {path: 'signup', component: SignupComponent},
  {path: 'material', component: MaterialComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
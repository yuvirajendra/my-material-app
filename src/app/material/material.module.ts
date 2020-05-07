import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlexModule } from '@angular/flex-layout';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FlexModule,
    MatNativeDateModule,
    MatDatepickerModule
  ],
  exports: [
    BrowserAnimationsModule, 
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FlexModule,
    MatNativeDateModule,
    MatDatepickerModule
  ]
})
export class MaterialModule { } 

import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-stop',
  template: `<h1 mat-dialog-title>You have {{progressData.progress}} % Do you want to stop?</h1>
             <mat-dialog-actions>
                <button mat-button [mat-dialog-close]="true">Yes</button>
                <button mat-button [mat-dialog-close]="false">No</button>
             </mat-dialog-actions>
  `
})
export class StopTrainingComponent {
    constructor( @Inject(MAT_DIALOG_DATA) public progressData: any) { }    
}
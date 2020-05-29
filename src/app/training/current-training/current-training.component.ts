import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training.component';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer;
  constructor(public dialog: MatDialog, private _trainingService: TrainingService) { }

  ngOnInit(): void {
    this.startOrResumeTimer();
  }

  onStop() { 
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this._trainingService.saveCancelledExercise(this.progress);
        }  
        else {
          this.startOrResumeTimer();
        }
      }
    )
  }

  private startOrResumeTimer() {
    const step = this._trainingService.getRunningExercise().exerciseDuration/100 * 1000;
    this.timer = setInterval(
      () => {
        this.progress += 5;

        if (this.progress >= 100) {
          clearInterval(this.timer);
          this._trainingService.saveCompletedExercise();
        }
      }, step
    )
  }
}
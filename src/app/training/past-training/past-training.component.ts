import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from '../exercise';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit {
  displayExerciseColumns:string[] = ['exerciseId', 'exerciseName', 'exerciseDuration', 'calories', 'status', 'date'];
  dataSource = [];

  constructor(private _trainingService: TrainingService) { }

  ngOnInit(): void {
    console.log("Past Training");
    console.log(this._trainingService.getCompletedExercise());
    this.dataSource = this._trainingService.getCompletedExercise();
  }
}
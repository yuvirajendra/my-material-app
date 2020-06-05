import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from '../exercise';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit {
  displayExerciseColumns:string[] = ['exerciseName', 'exerciseDuration', 'calories', 'status', 'date'];
  dataSource: MatTableDataSource<Exercise>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  tempExerciseList: Exercise[] = [];
  exerciseSubscription: Subscription;
  constructor(private _trainingService: TrainingService) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.exerciseSubscription = this._trainingService.emitCompletedExercises.subscribe(
      (exercises) => {
        this.tempExerciseList = exercises;
        console.log("Past Training Subscription");  
        console.log(this.tempExerciseList);
        this.dataSource = new MatTableDataSource(exercises);
        this.dataSource.sort = this.sort; // It needs to be a property of MatTableDataSource
        this.dataSource.paginator = this.paginator;
      }
    )

    console.log("Inside Oninit")
    this._trainingService.getCompletedExercise();
  }

  ngAfterViewInit() {
    console.log("ngAfterViewInit");
    //this.dataSource = new MatTableDataSource(this.tempExerciseList);
    // this.dataSource.sort = this.sort; // It needs to be a property of MatTableDataSource
    // this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue
                            .trim()
                            .toLowerCase();
  }

  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe();
  }
} 
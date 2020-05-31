import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from '../exercise';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit {
  displayExerciseColumns:string[] = ['exerciseId', 'exerciseName', 'exerciseDuration', 'calories', 'status', 'date'];
  dataSource: MatTableDataSource<Exercise>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _trainingService: TrainingService) { }

  ngOnInit(): void {
    console.log("Past Training - ngOnInit");
    console.log(this._trainingService.getCompletedExercise());
    this.dataSource = new MatTableDataSource(this._trainingService.getCompletedExercise());
  }

  ngAfterViewInit() {
    console.log("ngAfterViewInit");
    this.dataSource.sort = this.sort; // It needs to be a property of MatTableDataSource
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue
                            .trim()
                            .toLowerCase();
  }
}
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  @Output() trainingStart = new EventEmitter();
  exerciseList: Exercise[] = [];

  constructor(private _trainingService: TrainingService) { }

  ngOnInit(): void {
    this.exerciseList = this._trainingService.getExercise();
  }

  onStart(form: NgForm) {
    console.log("********* Form ********");
    console.log(form.value);
    this._trainingService.startExercise(form.value.selectExercise);
    // this.trainingStart.emit();
  }
}

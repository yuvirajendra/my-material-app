import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  @Output() trainingStart = new EventEmitter();
  //exerciseList: Exercise[] = [];
  exerciseList: Observable<Exercise[]>;

  constructor(private _trainingService: TrainingService, 
              private firebaseDB: AngularFirestore) { }

  ngOnInit(): void {
    console.log("Inside ngInit of New Training");
    //this.exerciseList = this._trainingService.getExercise();
    this.exerciseList = this.firebaseDB.collection('available_exercises')
                   .snapshotChanges()
                   .map(docArray => {
                       return docArray.map(doc => {
                           return {
                             exerciseId: doc.payload.doc.id,
                             exerciseName: doc.payload.doc.data()["exerciseName"],
                             exerciseDuration: doc.payload.doc.data()["exerciseDuration"],
                             calories: doc.payload.doc.data()["calories"]
                           };
                         }
                       )
                     }
                   );

    console.log(this.exerciseList);
  }

  onStart(form: NgForm) {
    console.log("********* Form ********");
    console.log(form.value);
    this._trainingService.startExercise(form.value.selectExercise);
    // this.trainingStart.emit();
  }
}
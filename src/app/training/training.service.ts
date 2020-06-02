import { Injectable } from '@angular/core';
import { Exercise } from './exercise';
import { Subject } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private availableExercise: Exercise[] = [];
  private runningExercise: Exercise;
  changedExercise = new Subject<Exercise>();
  emitExercises = new Subject<Exercise[]>();
  emitCompletedExercises = new Subject<Exercise[]>();
  constructor(private firebaseDB: AngularFirestore) { }

  fetchAvailableExercise() {
    this.firebaseDB.collection('available_exercises')
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
    )
    .subscribe(
      (exercises: Exercise[]) => {
        this.availableExercise = exercises;
        this.emitExercises.next([...this.availableExercise]);
      }
    )
  }

  getExercise() {
    return this.availableExercise.slice(); // Creates a copy of the varaible and return to the invoker
  }

  startExercise(exerciseId: string) {
    this.runningExercise = this.availableExercise.find(exercise => exercise.exerciseId == exerciseId);
    this.changedExercise.next({...this.runningExercise}); // This will create a copy of the varaiable and broadcast 
  }

  getRunningExercise() {
    return {...this.runningExercise};
  }

  saveCompletedExercise() {
    console.log("saveCompletedExercise");
    this.addExerciseToDB({
      ...this.runningExercise, 
      status: 'completed',
      date: new Date()
    });
    this.runningExercise = null;
    this.changedExercise.next(null); 
  }

  saveCancelledExercise(progress: number) {
    console.log("saveCancelledExercise");
    this.addExerciseToDB({
      ...this.runningExercise, 
      exerciseDuration: this.runningExercise.exerciseDuration * (progress/100),
      calories: this.runningExercise.calories * (progress/100),
      status: 'cancelled',
      date: new Date()
    });
    this.runningExercise = null;
    this.changedExercise.next(null); 
  }

  getCompletedExercise() {
    console.log("getCompletedExercise");
    this.firebaseDB.collection("completed_exercise")
                   .valueChanges()
                   .subscribe(
                    (exercises: Exercise[]) => {
                      this.emitCompletedExercises.next(exercises);
                      console.log("Completed Exercise from DB");
                      console.log(exercises);
                    }
                   );
  }

  private addExerciseToDB(exercise: Exercise) {
    this.firebaseDB.collection('completed_exercise').add(exercise);
  }
}
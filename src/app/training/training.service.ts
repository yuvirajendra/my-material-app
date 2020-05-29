import { Injectable } from '@angular/core';
import { Exercise } from './exercise';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  private availableExercise: Exercise[] = [
    {exerciseId: 'crunches', exerciseName: 'Crunches', exerciseDuration: 30, calories: 100},
    {exerciseId: 'squats', exerciseName: 'Squats', exerciseDuration: 60, calories: 200},
    {exerciseId: 'situps', exerciseName: 'Sit ups', exerciseDuration: 100, calories: 150},
    {exerciseId: 'pushups', exerciseName: 'Push ups', exerciseDuration: 30, calories: 175},
    {exerciseId: 'walking', exerciseName: 'Walking', exerciseDuration: 600, calories: 250},
    {exerciseId: 'jogging', exerciseName: 'Jogging', exerciseDuration: 300, calories: 300}
  ];

  private completedExercises: Exercise[] = [];

  private runningExercise: Exercise;
  changedExercise = new Subject<Exercise>();

  constructor() { }

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
    this.completedExercises.push({
      ...this.runningExercise, 
      status: 'completed',
      date: new Date()
    });
    this.runningExercise = null;
    this.changedExercise.next(null); 
  }

  saveCancelledExercise(progress: number) {
    console.log("saveCancelledExercise");
    this.completedExercises.push({
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
    return this.completedExercises.slice();
  }
}
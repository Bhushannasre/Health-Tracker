import { WorkoutService } from './../workout.service';
import { Component, NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-workout-form',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.css']
})
export class WorkoutFormComponent {

  userName: string = '';
  workoutType: string = '';
  workoutMinutes: number | null = null;



  constructor(private workoutService: WorkoutService) {}

  addWorkout() {
    if (this.userName && this.workoutType && this.workoutMinutes) {
      this.workoutService.addWorkout(this.userName, this.workoutType, this.workoutMinutes);
      this.userName = '';
      this.workoutType = '';
      this.workoutMinutes = null;
      alert("Data Added Sucessfully!")
    }
  }
  // editWorkout(workoutlist: any):void{
  //   this.workoutService.setValue({
  //   userName=workoutlist.userName,
  //   workoutType=workoutlist.workoutType,
  //   workoutMinutes=workoutlist.workoutMinutes,

  //   });


  reset(): void {
    this.userName = '';
    this.workoutType = '';
    this.workoutMinutes = null;
  }

}

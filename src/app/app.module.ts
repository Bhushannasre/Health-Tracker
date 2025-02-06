import {  NgChartsModule } from 'ng2-charts';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  // Add this import


import { WorkoutListComponent } from './workout-list/workout-list.component';
import { AppComponent } from './app.component';
import { CommonModule} from '@angular/common';
import { WorkoutFormComponent } from './workout-form/workout-form.component';
import { WorkoutChartComponent } from './workout-chart/workout-chart.component';


@NgModule({
  declarations: [

     NgModule,

    WorkoutListComponent,
    WorkoutFormComponent,
    WorkoutChartComponent,

    WorkoutChartComponent,




  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgChartsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component } from '@angular/core';
import { WorkoutListComponent } from "../workout-list/workout-list.component";
import { WorkoutChartComponent } from "../workout-chart/workout-chart.component";
import { User } from '../Model/user.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
[x: string]: any;
  users: User[] = [];
  updateUsers(users: User[]) {
    console.log("Updated Users in Dashboard:", users);
    this.users = users;
  }
}





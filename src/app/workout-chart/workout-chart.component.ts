import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartData } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';


@Component({
  selector: 'app-workout-chart',
  standalone: true,
  imports: [FormsModule, CommonModule, NgChartsModule],
  templateUrl: './workout-chart.component.html',
  styleUrls: ['./workout-chart.component.css'],
})
export class WorkoutChartComponent implements OnChanges {
  @Input() users: any[] = [];
  selectedUser: string | undefined;
  chartData: ChartData<'bar'> = { labels: [], datasets: [] };
chartOptions: any;
chartType: any;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['users'] && this.users.length > 0) {
      console.log('WorkoutChartComponent received users:', this.users);
      this.selectedUser = this.users[0]?.name || ''; // Set default user

      this.updateChartData();
    }
  }

  updateChartData() {
    const user = this.users.find(u => u.name === this.selectedUser);

    if (!user || !user.workouts || user.workouts.length === 0) {
      this.chartData = { labels: [], datasets: [] };
      return;
    }

    const workoutMinutes = user.workouts.reduce((acc: Record<string, number>, workout: any) => {
      acc[workout.type] = (acc[workout.type] || 0) + workout.minutes;
      return acc;
    }, {} as Record<string, number>);

    this.chartData = {
      labels: Object.keys(workoutMinutes),
      datasets: [
        {
          label: `${this.selectedUser}'s Workout Minutes`,
          data: Object.values(workoutMinutes),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  }
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { WorkoutService } from '../workout.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Define a type-safe User and Workout interface
interface Workout {
  type: string;
  minutes: number;
}

interface User {
  id: number;
  name: string;
  workouts: Workout[];
}

@Component({
  selector: 'app-workout-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.scss'],
})
export class WorkoutListComponent implements OnInit {
  @Output() usersUpdated = new EventEmitter<User[]>(); //  Type-safe event emitter

  users: User[] = [];
  filteredUsers: User[] = [];
  displayedUsers: User[] = [];
  searchQuery: string = '';
  workoutFilter: string = '';

  currentPage: number = 1;
  pageSize: number = 5; // Adjust number of users per page
  totalPages: number = 0;

  constructor(private workoutService: WorkoutService) {}

  ngOnInit() {
    this.loadUsers();
  }

  /**  Fetches users from service and initializes the list */
  loadUsers(): void {
    this.users = this.workoutService.getUsers() || [];
    this.filterUsers(); // Apply filter and pagination initially
  }

  /**  Filters users based on search query & workout type */
  filterUsers(): void {
    this.filteredUsers = this.users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesWorkout = this.workoutFilter
        ? user.workouts.some(workout => workout.type.toLowerCase().includes(this.workoutFilter.toLowerCase()))
        : true;
      return matchesSearch && matchesWorkout;
    });

    this.totalPages = Math.ceil(this.filteredUsers.length / this.pageSize);
    this.currentPage = 1; // Reset to first page after filtering
    this.updateDisplayedUsers();
  }

  /**  Updates displayed users based on pagination */
  updateDisplayedUsers(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.displayedUsers = this.filteredUsers.slice(startIndex, startIndex + this.pageSize);
    this.emitUsers();
  }

  /**  Moves to the previous page */
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedUsers();
    }
  }

  /**  Moves to the next page */
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedUsers();
    }
  }

  /**  Counts workouts for a user */
  getWorkoutCount(user: User): number {
    return user.workouts.length;
  }

  /**  Deletes a user's workouts permanently after confirmation */
deleteWorkout(userId: number): void {
  const userToDelete = this.users.find(user => user.id === userId);
  if (!userToDelete) return;

  const confirmDelete = confirm(`Are you sure you want to delete ${userToDelete.name}'s workouts?`);
  if (!confirmDelete) return;

  // Remove user from the list
  this.users = this.users.filter(user => user.id !== userId);

  // Update localStorage
  localStorage.setItem('workoutData', JSON.stringify(this.users));

  this.filterUsers(); // Reapply filtering & pagination after deletion
  alert('Data Deleted succesfully!')
}

  /**  Emits the updated users list */
  private emitUsers(): void {
    console.log('WorkoutListComponent emitting users:', this.filteredUsers);
    this.usersUpdated.emit([...this.filteredUsers]);
  }

}

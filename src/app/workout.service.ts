import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
interface User {
  id: number;
  name: string;
  workouts: { type: string, minutes: number }[];
}

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  setValue(arg0: {}) {
    throw new Error('Method not implemented.');
  }
  private storageKey = 'workoutData';
  private usersSubject = new BehaviorSubject<User[]>([]);

  users$ = this.usersSubject.asObservable();

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    if (!localStorage.getItem(this.storageKey)) {
      const initialData: User[] = [

        { id: 1, name: 'Jane Smith', workouts: [{ type: 'Cycling', minutes: 45 }] },
        { id: 2, name: 'John Doe', workouts: [{ type: 'Running', minutes: 30 }] },
        { id: 3, name: 'Mike Johnson', workouts: [{ type: 'Yoga', minutes: 50 }] }
      ];
      localStorage.setItem(this.storageKey, JSON.stringify(initialData));
    }
  }

  // getUsers(): User[] {
  //   return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  // }
  getUsers(): User[] {
    const users = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    console.log('Users from localStorage:', users);
    return users;
  }

  addWorkout(userName: string, workoutType: string, minutes: number) {
    let users = this.getUsers();
    let user = users.find(u => u.name.toLowerCase() === userName.toLowerCase());




    if (!user) {
      user = { id: Date.now(), name: userName, workouts: [] };
      users.push(user);
    }

    user.workouts.push({ type: workoutType, minutes });

    localStorage.setItem(this.storageKey, JSON.stringify(users));
    this.usersSubject.next(users);
  }
  getWorkoutCount(userName: string): number {
    let users = this.getUsers();
    let user = users.find(u => u.name.toLowerCase() === userName.toLowerCase());
    return user ? user.workouts.length : 0;
  }
  deleteWorkout(userName: string): boolean {
    let users = this.getUsers();
    const initialLength = users.length;

    users = users.filter((user) => user.name !== userName);

    if (users.length < initialLength) {
      localStorage.setItem(this.storageKey, JSON.stringify(users));
      return true; // Successfully deleted
    }

    return false; // User not found
  }

}

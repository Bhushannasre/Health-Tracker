import { TestBed } from '@angular/core/testing';
import { WorkoutService } from './workout.service';

describe('WorkoutService', () => {
  let service: WorkoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutService);
    localStorage.clear(); // Clear localStorage before each test
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an empty array if no users are saved', () => {
    expect(service.getUsers()).toEqual([]);
  });

  it('should add a new user with workouts', () => {
    const newUser = { id: 1, name: 'Alice', workouts: [{ type: 'Running', minutes: 30 }] };
    service.saveUsers([newUser]);

    expect(service.getUsers().length).toBe(1);
    expect(service.getUsers()[0].name).toBe('Alice');
  });

  it('should delete a user by ID', () => {
    const users = [
      { id: 1, name: 'Alice', workouts: [{ type: 'Running', minutes: 30 }] },
      { id: 2, name: 'Bob', workouts: [{ type: 'Cycling', minutes: 45 }] }
    ];
    service.saveUsers(users);

    service.deleteUser(1);
    const remainingUsers = service.getUsers();

    expect(remainingUsers.length).toBe(1);
    expect(remainingUsers[0].name).toBe('Bob');
  });
});

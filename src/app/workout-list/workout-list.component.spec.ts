import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutListComponent } from './workout-list.component';
import { WorkoutService } from '../workout.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('WorkoutListComponent', () => {
  let component: WorkoutListComponent;
  let fixture: ComponentFixture<WorkoutListComponent>;
  let mockWorkoutService: jasmine.SpyObj<WorkoutService>;

  beforeEach(async () => {
    // Mock WorkoutService
    mockWorkoutService = jasmine.createSpyObj('WorkoutService', ['getUsers']);
    mockWorkoutService.getUsers.and.returnValue([
      { id: 1, name: 'Alice', workouts: [{ type: 'Running', minutes: 30 }] },
      { id: 2, name: 'Bob', workouts: [{ type: 'Cycling', minutes: 45 }] }
    ]);

    await TestBed.configureTestingModule({
      imports: [FormsModule, CommonModule],
      declarations: [WorkoutListComponent],
      providers: [{ provide: WorkoutService, useValue: mockWorkoutService }]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load users from the service', () => {
    expect(component.users.length).toBe(2);
    expect(component.users[0].name).toBe('Alice');
  });

  it('should filter users based on search query', () => {
    component.searchQuery = 'Bob';
    component.filterUsers();
    expect(component.filteredUsers.length).toBe(1);
    expect(component.filteredUsers[0].name).toBe('Bob');
  });

  it('should delete a user permanently', () => {
    spyOn(localStorage, 'setItem');
    component.deleteWorkout(1);
    expect(component.users.length).toBe(1);
    expect(localStorage.setItem).toHaveBeenCalled();
  });
});

import { Component, computed, signal } from '@angular/core';
import { NgFor } from '@angular/common';

type Workout = {
  id: number;
  name: string;
  duration: string;
  completed: boolean;
};

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [NgFor],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('Aplicación Fitness');

  protected readonly workouts = signal<Workout[]>([
    { id: 1, name: 'Rutina HIIT', duration: '20 min', completed: false },
    { id: 2, name: 'Yoga de estiramiento', duration: '30 min', completed: false },
    { id: 3, name: 'Circuito de fuerza', duration: '40 min', completed: false }
  ]);

  protected readonly newWorkout = signal('');

  protected readonly completedCount = computed(
    () => this.workouts().filter((item) => item.completed).length
  );

  protected addWorkout(): void {
    const name = this.newWorkout().trim();
    if (!name) {
      return;
    }

    const nextId = this.workouts().reduce((max, workout) => Math.max(max, workout.id), 0) + 1;
    this.workouts.update((items) => [
      ...items,
      { id: nextId, name, duration: '30 min', completed: false }
    ]);
    this.newWorkout.set('');
  }

  protected toggleCompleted(id: number): void {
    this.workouts.update((items) =>
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  }
}

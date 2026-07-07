import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatosFitnessService } from '../../services/datos-fitness.service';

export type Workout = {
  id: number;
  name: string;
  duration: string;
  completed: boolean;
};

@Component({
  standalone: true,
  selector: 'app-gestion-rutinas',
  imports: [CommonModule],
  templateUrl: './gestion-rutinas.html',
  styleUrls: ['./gestion-rutinas.css']
})
export class GestionRutinasComponent {
  private readonly datosFitnessService = inject(DatosFitnessService);

  protected readonly title = signal('Gestión de rutinas');
  protected readonly workouts = signal<Workout[]>([]);
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

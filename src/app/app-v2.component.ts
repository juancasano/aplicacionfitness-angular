import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Workout } from './models/workout';

@Component({
  standalone: true,
  selector: 'app-v2',
  imports: [CommonModule, FormsModule],
  template: `
    <main class="page">
      <section class="hero">
        <p class="eyebrow">Ejercicio 2</p>
        <h1>{{ title() }}</h1>
        <p class="intro">Segunda versión del planificador de rutinas con datos mejorados.</p>
      </section>

      <section class="planner" aria-labelledby="planner-title">
        <header class="planner-header">
          <div>
            <h2 id="planner-title">Rutinas Fitness v2</h2>
            <p class="subtext">Añade nuevas rutinas y marca las completadas.</p>
          </div>
          <div class="summary">
            <span>{{ workouts().length }}</span> rutinas •
            <span>{{ completedCount() }}</span> completadas
          </div>
        </header>

        <form class="workout-form" (ngSubmit)="addWorkout()">
          <label class="field">
            <span class="label-text">Nueva rutina</span>
            <input
              type="text"
              [value]="newWorkout()"
              (input)="newWorkout.set($any($event.target).value)"
              placeholder="Ej: Fuerza de piernas"
              aria-label="Nombre de la rutina"
            />
          </label>
          <button type="submit" [disabled]="!newWorkout().trim()">Añadir</button>
        </form>

        <ul class="workout-list">
          <li class="workout-item" *ngFor="let workout of workouts()" [class.completed]="workout.completed">
            <button
              type="button"
              class="check"
              [attr.aria-pressed]="workout.completed"
              (click)="toggleCompleted(workout.id)"
            >
              {{ workout.completed ? '✔' : '○' }}
            </button>
            <div class="info">
              <strong>{{ workout.name }}</strong>
              <span>{{ workout.duration }}</span>
            </div>
          </li>
        </ul>
      </section>
    </main>
  `,
  styles: [
    `
      .page {
        max-width: 52rem;
        margin: 0 auto;
        display: grid;
        gap: 2rem;
        padding: 1.5rem;
      }
      .hero {
        padding: 2rem;
        border-radius: 1.5rem;
        background: white;
        box-shadow: 0 20px 60px rgba(15, 23, 42, 0.08);
      }
      .eyebrow {
        margin: 0 0 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.2em;
        font-size: 0.75rem;
        color: #2563eb;
      }
      h1 {
        margin: 0;
        font-size: clamp(2.25rem, 4vw, 3.5rem);
        line-height: 1;
      }
      .intro {
        margin: 1rem 0 0;
        max-width: 40rem;
        color: #4b5563;
        font-size: 1rem;
        line-height: 1.75;
      }
      .planner {
        background: white;
        border-radius: 1.5rem;
        padding: 1.75rem;
        box-shadow: 0 20px 60px rgba(15, 23, 42, 0.08);
      }
      .planner-header {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 1rem;
        align-items: center;
        margin-bottom: 1.5rem;
      }
      .planner-header h2 {
        margin: 0;
        font-size: 1.35rem;
      }
      .subtext {
        margin: 0.5rem 0 0;
        color: #6b7280;
      }
      .summary {
        font-weight: 700;
        color: #111827;
      }
      .workout-form {
        display: grid;
        gap: 0.85rem;
        grid-template-columns: 1fr auto;
        align-items: flex-end;
        margin-bottom: 1.5rem;
      }
      .field {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      .label-text {
        font-size: 0.9rem;
        color: #374151;
      }
      input {
        width: 100%;
        padding: 0.65rem 1rem;
        border: 2px solid #e5e7eb;
        border-radius: 0.75rem;
        font-size: 1rem;
        background: white;
      }
      button {
        border: 0;
        border-radius: 0.75rem;
        padding: 0.65rem 1.75rem;
        font-weight: 600;
        color: white;
        background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
        cursor: pointer;
      }
      button:disabled {
        background: linear-gradient(135deg, #bfdbfe 0%, #93c5fd 100%);
        cursor: not-allowed;
      }
      .workout-list {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: 1rem;
      }
      .workout-item {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 1rem;
        align-items: center;
        padding: 1rem;
        border-radius: 1.1rem;
        background: #f8fafc;
      }
      .workout-item.completed {
        opacity: 0.7;
      }
      .check {
        width: 2.8rem;
        height: 2.8rem;
        border-radius: 50%;
        border: 2.5px solid #e5e7eb;
        background: white;
        color: #111827;
        font-size: 1.3rem;
        cursor: pointer;
      }
      .check[aria-pressed="true"] {
        background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
        color: white;
        border-color: #1d4ed8;
      }
      .info {
        display: grid;
        line-height: 1.4;
      }
    `
  ]
})
export class AppV2 {
  protected readonly title = signal('Rutinas Fitness v2');

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
    if (!name) return;

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

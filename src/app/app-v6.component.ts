import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface DiaSemana {
  id: number;
  nombre: string;
  ejercicio: string;
  duracion: string;
  completado: boolean;
}

@Component({
  standalone: true,
  selector: 'app-v6',
  imports: [CommonModule, FormsModule],
  template: `
    <main class="page">
      <section class="hero">
        <p class="eyebrow">Versión 6</p>
        <h1>{{ title() }}</h1>
        <p class="intro">Control semanal de entrenamientos con enfoque en recuperación, fuerza y cardio.</p>
      </section>

      <section class="planner" aria-labelledby="planner-title">
        <header class="planner-header">
          <div>
            <h2 id="planner-title">Plan semanal de fitness</h2>
            <p class="subtext">Organiza tus entrenos de la semana y marca los días completados.</p>
          </div>
          <div class="summary">
            <span>{{ weekPlan().length }}</span> días programados •
            <span>{{ completedCount() }}</span> completados
          </div>
        </header>

        <div class="week-grid">
          <button
            *ngFor="let dia of weekPlan()"
            type="button"
            class="day-card"
            [class.active]="selectedDay() === dia.id"
            [class.completed]="dia.completado"
            (click)="selectedDay.set(dia.id)">
            <strong>{{ dia.nombre }}</strong>
            <span>{{ dia.ejercicio }}</span>
            <span>{{ dia.duracion }}</span>
          </button>
        </div>

        <div class="day-details" *ngIf="selectedDayPlan() as dia">
          <h3>Detalle del día</h3>
          <p class="detail-text">Hoy toca <strong>{{ dia.ejercicio }}</strong> durante {{ dia.duracion }}.</p>

          <label class="field">
            <span class="label-text">Modificar entrenamiento</span>
            <input
              type="text"
              [value]="dia.ejercicio"
              (input)="updateExercise($event.target.value)"
              aria-label="Ejercicio del día"
            />
          </label>

          <button type="button" class="mark-button" (click)="toggleCompleted(dia.id)">
            {{ dia.completado ? 'Marcar como no completado' : 'Marcar como completado' }}
          </button>

          <div class="progress-card">
            <p>Porcentaje completado:</p>
            <div class="progress-bar">
              <div class="progress-fill" [style.width]="completionPercent() + '%' "></div>
            </div>
            <span>{{ completionPercent() | number:'1.0-0' }}%</span>
          </div>
        </div>
      </section>
    </main>
  `,
  styles: [
    `
      :host {
        display: block;
        min-height: 100dvh;
        background: radial-gradient(circle at top, #eef2ff 0%, #f8fafc 45%, #ffffff 100%);
        color: #0f172a;
        font-family: Inter, system-ui, sans-serif;
        padding: 1.5rem;
      }

      .page {
        max-width: 54rem;
        margin: 0 auto;
        display: grid;
        gap: 2rem;
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
        max-width: 42rem;
        color: #475569;
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
        color: #475569;
      }

      .summary {
        font-weight: 700;
        color: #111827;
      }

      .week-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));
        gap: 1rem;
        margin-bottom: 1.5rem;
      }

      .day-card {
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 1rem;
        padding: 1rem;
        text-align: left;
        transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
      }

      .day-card:hover,
      .day-card.active {
        background: #dbeafe;
        border-color: #93c5fd;
        transform: translateY(-2px);
      }

      .day-card.completed {
        opacity: 0.8;
      }

      .day-card strong {
        display: block;
        margin-bottom: 0.5rem;
        font-size: 1rem;
      }

      .day-card span {
        display: block;
        color: #475569;
        font-size: 0.95rem;
      }

      .day-details {
        display: grid;
        gap: 1.25rem;
      }

      .detail-text {
        margin: 0;
        color: #334155;
      }

      .field {
        display: grid;
        gap: 0.5rem;
      }

      .label-text {
        font-size: 0.9rem;
        color: #475569;
      }

      input {
        width: 100%;
        padding: 0.9rem 1rem;
        border: 2px solid #e2e8f0;
        border-radius: 0.9rem;
        font-size: 1rem;
        color: #0f172a;
      }

      button {
        border: 0;
        border-radius: 0.95rem;
        padding: 0.9rem 1.25rem;
        background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
        color: white;
        font-weight: 700;
        cursor: pointer;
      }

      .progress-card {
        background: #eff6ff;
        padding: 1rem;
        border-radius: 1rem;
        border: 1px solid #dbeafe;
      }

      .progress-bar {
        height: 1rem;
        border-radius: 999px;
        background: #e0f2fe;
        overflow: hidden;
        margin: 0.75rem 0;
      }

      .progress-fill {
        height: 100%;
        background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
        transition: width 0.2s ease;
      }

      @media (min-width: 768px) {
        .day-details {
          grid-template-columns: 1fr;
        }
      }
    `
  ]
})
export class AppV6 {
  protected readonly title = signal('Control Semanal');

  protected readonly weekPlan = signal<DiaSemana[]>([
    { id: 1, nombre: 'Lunes', ejercicio: 'Pierna y fuerza', duracion: '40 min', completado: false },
    { id: 2, nombre: 'Martes', ejercicio: 'Cardio intenso', duracion: '30 min', completado: false },
    { id: 3, nombre: 'Miércoles', ejercicio: 'Yoga y recuperación', duracion: '35 min', completado: false },
    { id: 4, nombre: 'Jueves', ejercicio: 'Core y estabilidad', duracion: '30 min', completado: false },
    { id: 5, nombre: 'Viernes', ejercicio: 'Circuito completo', duracion: '45 min', completado: false },
    { id: 6, nombre: 'Sábado', ejercicio: 'Caminata activa', duracion: '25 min', completado: false },
    { id: 7, nombre: 'Domingo', ejercicio: 'Descanso activo', duracion: '20 min', completado: false }
  ]);

  protected readonly selectedDay = signal(1);

  protected readonly selectedDayPlan = computed(() =>
    this.weekPlan().find((dia) => dia.id === this.selectedDay())
  );

  protected readonly completedCount = computed(
    () => this.weekPlan().filter((dia) => dia.completado).length
  );

  protected completionPercent(): number {
    return Math.round((this.completedCount() / this.weekPlan().length) * 100);
  }

  protected toggleCompleted(id: number): void {
    this.weekPlan.update((items) =>
      items.map((dia) =>
        dia.id === id ? { ...dia, completado: !dia.completado } : dia
      )
    );
  }

  protected updateExercise(value: string): void {
    this.weekPlan.update((items) =>
      items.map((dia) =>
        dia.id === this.selectedDay() ? { ...dia, ejercicio: value } : dia
      )
    );
  }
}

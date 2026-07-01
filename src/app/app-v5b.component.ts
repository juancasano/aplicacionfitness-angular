import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { V5bExerciseList } from './app-v5b-exercise-list.component';
import { V5bExerciseDetail } from './app-v5b-exercise-detail.component';

interface Categoria {
  id: number;
  nombre: string;
}

interface Ejercicio {
  id: number;
  nombre: string;
  idCategoria: number;
  descripcion: string;
  imagenUrl: string;
}

interface Rutina {
  id: number;
  idEjercicio: number;
  duracion: string;
  completada: boolean;
  fecha: Date;
}

@Component({
  standalone: true,
  selector: 'app-v5b',
  imports: [CommonModule, FormsModule, V5bExerciseList, V5bExerciseDetail],
  template: `
    <main class="page">
      <section class="hero">
        <p class="eyebrow">Versión 5B</p>
        <h1>{{ title() }}</h1>
        <p class="intro">Modo de entrenamiento con desafío diario, metas y estado visual.</p>
      </section>

      <section class="planner" aria-labelledby="planner-title">
        <header class="planner-header">
          <div>
            <h2 id="planner-title">Rutinas Fitness v5b</h2>
            <p class="subtext">Perspectiva diaria de entrenamiento con logros y progreso.</p>
          </div>
          <div class="summary">
            <span>{{ rutinas().length }}</span> rutinas programadas •
            <span>{{ completedCount() }}</span> completadas
          </div>
        </header>

        <div class="goals-card">
          <h3>Meta diaria</h3>
          <p>Completa al menos <strong>3 rutinas</strong> para cerrar el día.</p>
          <div class="progress-bar">
            <div class="progress-fill" [style.width]="progressPercent() + '%' "></div>
          </div>
        </div>

        <form class="workout-form" (ngSubmit)="addRutina()">
          <label class="field">
            <span class="label-text">Ejercicio</span>
            <select [ngModel]="ejercicioSeleccionado()" (ngModelChange)="ejercicioSeleccionado.set($event)" name="ejercicio">
              <option *ngFor="let ejercicio of ejercicios()" [ngValue]="ejercicio.id">
                {{ ejercicio.nombre }}
              </option>
            </select>
          </label>

          <label class="field">
            <span class="label-text">Duración</span>
            <input
              type="text"
              [ngModel]="duracionNueva()"
              (ngModelChange)="duracionNueva.set($event)"
              name="duracion"
              placeholder="Ej: 20 min"
              aria-label="Duración de la rutina"
            />
          </label>

          <button type="submit" [disabled]="!duracionNueva().trim()">Programar rutina</button>
        </form>

        <v5b-exercise-list [ejercicios]="ejercicios()" (seleccionar)="onSeleccion($event)"></v5b-exercise-list>
        <v5b-exercise-detail [ejercicio]="ejercicioSeleccionadoObj()"></v5b-exercise-detail>

        <div class="rutinas-list">
          <h3>Rutinas del día</h3>
          <ul>
            <li *ngFor="let rutina of rutinas()" [class.completed]="rutina.completada">
              <button type="button" class="check" [attr.aria-pressed]="rutina.completada" (click)="toggleRutina(rutina.id)">
                {{ rutina.completada ? '✔' : '○' }}
              </button>
              <div class="rutina-info">
                <strong>{{ obtenerNombreEjercicio(rutina.idEjercicio) }}</strong>
                <span>{{ rutina.duracion }}</span>
                <span>{{ rutina.fecha | date:'shortTime' }}</span>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </main>
  `,
  styles: [
    `
      :host {
        display: block;
        min-height: 100dvh;
        background: radial-gradient(circle at top, #f8fbff 0%, #eff6ff 35%, #f8fafc 100%);
        color: #1f2937;
        font-family: Inter, system-ui, sans-serif;
        padding: 1.5rem;
      }

      .page {
        max-width: 52rem;
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

      .goals-card {
        background: #eff6ff;
        padding: 1.5rem;
        border-radius: 1rem;
        border: 1px solid #dbeafe;
        margin-bottom: 1.5rem;
      }

      .progress-bar {
        margin-top: 1rem;
        height: 1rem;
        border-radius: 999px;
        background: #e0f2fe;
        overflow: hidden;
      }

      .progress-fill {
        height: 100%;
        background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
        transition: width 0.2s ease;
      }

      .workout-form {
        display: grid;
        gap: 0.85rem;
        grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
        align-items: flex-end;
        margin-bottom: 1.5rem;
      }

      .field {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .exercise-preview {
        display: grid;
        grid-template-columns: 160px 1fr;
        gap: 1rem;
        background: #f8fafc;
        padding: 1.25rem;
        border-radius: 1rem;
        border: 1px solid #e5e7eb;
        align-items: center;
        margin-bottom: 1.5rem;
      }

      .exercise-image {
        width: 100%;
        min-width: 160px;
        overflow: hidden;
        border-radius: 1rem;
      }

      .exercise-image img {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
      }

      .exercise-details h3 {
        margin: 0 0 0.5rem;
        font-size: 1.1rem;
      }

      .exercise-details p {
        margin: 0;
        color: #475569;
        line-height: 1.6;
      }

      .label-text {
        font-size: 0.9rem;
        color: #374151;
      }

      select,
      input {
        width: 100%;
        padding: 0.65rem 1rem;
        border: 2px solid #e5e7eb;
        border-radius: 0.75rem;
        font-size: 1rem;
        background: white;
        color: #111827;
      }

      select:focus,
      input:focus {
        outline: none;
        border-color: #2563eb;
        box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
      }

      button {
        border: 0;
        border-radius: 0.75rem;
        padding: 0.65rem 1.75rem;
        font-weight: 600;
        color: white;
        background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        box-shadow: 0 4px 15px rgba(37, 99, 235, 0.2);
      }

      button:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(37, 99, 235, 0.25);
      }

      button:active:not(:disabled) {
        transform: translateY(-1px);
      }

      button:disabled {
        background: linear-gradient(135deg, #bfdbfe 0%, #93c5fd 100%);
        cursor: not-allowed;
        box-shadow: 0 2px 8px rgba(37, 99, 235, 0.15);
      }

      .rutinas-list ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: 1rem;
      }

      .rutinas-list li {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 1rem;
        align-items: center;
        background: #f8fafc;
        padding: 1rem;
        border-radius: 1rem;
        border: 1px solid #e5e7eb;
      }

      .rutinas-list li.completed {
        opacity: 0.75;
      }

      .check {
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        border: 2px solid #e5e7eb;
        background: white;
        color: #111827;
        font-size: 1.25rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }

      .rutina-info strong {
        display: block;
        margin-bottom: 0.25rem;
      }

      .rutina-info span {
        color: #6b7280;
        font-size: 0.95rem;
        display: block;
      }
    `
  ]
})
export class AppV5b {
  protected readonly title = signal('Desafío diario');

  protected readonly ejercicios = signal<Ejercicio[]>([
    {
      id: 1,
      nombre: 'Puentes de glúteo',
      idCategoria: 1,
      descripcion: 'Fortalece la cadena posterior y cadera.',
      imagenUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="280"%3E%3Crect width="400" height="280" fill="%2320354f"/%3E%3Ctext x="50%25" y="42%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="48" fill="%23ffffff"%3E🦵%3C/text%3E%3Ctext x="50%25" y="70%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" fill="%23ffffff"%3EPuentes%20de%20gl%C3%BAteo%3C/text%3E%3C/svg%3E'
    },
    {
      id: 2,
      nombre: 'Estocadas alternas',
      idCategoria: 1,
      descripcion: 'Activa piernas y estabilidad en cada repetición.',
      imagenUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="280"%3E%3Crect width="400" height="280" fill="%232c4e16"/%3E%3Ctext x="50%25" y="42%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="48" fill="%23ffffff"%3E🏃%3C/text%3E%3Ctext x="50%25" y="70%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" fill="%23ffffff"%3EEstocadas%3C/text%3E%3C/svg%3E'
    },
    {
      id: 3,
      nombre: 'Salto de cuerda',
      idCategoria: 3,
      descripcion: 'Cardio dinámico para elevar la frecuencia.',
      imagenUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="280"%3E%3Crect width="400" height="280" fill="%230f172a"/%3E%3Ctext x="50%25" y="42%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="48" fill="%23facc15"%3E🤸%3C/text%3E%3Ctext x="50%25" y="70%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" fill="%23ffffff"%3ESalto%20de%20cuerda%3C/text%3E%3C/svg%3E'
    },
    {
      id: 4,
      nombre: 'Tijeras de piernas',
      idCategoria: 3,
      descripcion: 'Ejercicio rápido para core y coordinación.',
      imagenUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="280"%3E%3Crect width="400" height="280" fill="%23282c34"/%3E%3Ctext x="50%25" y="42%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="48" fill="%23ffffff"%3E✂️%3C/text%3E%3Ctext x="50%25" y="70%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" fill="%23ffffff"%3ETijeras%3C/text%3E%3C/svg%3E'
    }
  ]);

  protected readonly duracionNueva = signal('20 min');
  protected readonly ejercicioSeleccionado = signal(1);
  protected readonly rutinas = signal<Rutina[]>([
    { id: 1, idEjercicio: 1, duracion: '20 min', completada: false, fecha: new Date() },
    { id: 2, idEjercicio: 3, duracion: '15 min', completada: false, fecha: new Date() }
  ]);

  protected readonly completedCount = computed(
    () => this.rutinas().filter((rutina) => rutina.completada).length
  );

  protected readonly progressPercent = computed(() => Math.min(100, (this.completedCount() / 3) * 100));

  protected readonly ejercicioSeleccionadoObj = signal<Ejercicio | null>(null);

  protected onSeleccion(e: Ejercicio): void {
    this.ejercicioSeleccionadoObj.set(e);
  }

  protected addRutina(): void {
    const duracion = this.duracionNueva().trim();
    if (!duracion) return;

    const nextId = this.rutinas().reduce((max, rutina) => Math.max(max, rutina.id), 0) + 1;
    this.rutinas.update((items) => [
      ...items,
      {
        id: nextId,
        idEjercicio: this.ejercicioSeleccionado(),
        duracion,
        completada: false,
        fecha: new Date()
      }
    ]);
    this.duracionNueva.set('20 min');
  }

  protected toggleRutina(id: number): void {
    this.rutinas.update((items) =>
      items.map((item) =>
        item.id === id ? { ...item, completada: !item.completada } : item
      )
    );
  }

  protected obtenerNombreEjercicio(idEjercicio: number): string {
    const ejercicio = this.ejercicios().find((item) => item.id === idEjercicio);
    return ejercicio ? ejercicio.nombre : 'Ejercicio desconocido';
  }
}

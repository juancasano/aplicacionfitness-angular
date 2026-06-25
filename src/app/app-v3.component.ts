import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Categoria } from './models/categoria';
import { Ejercicio } from './models/ejercicio';
import { Rutina } from './models/rutina';

@Component({
  standalone: true,
  selector: 'app-v3',
  imports: [CommonModule, FormsModule],
  template: `
    <main class="page">
      <section class="hero">
        <p class="eyebrow">Ejercicio 3</p>
        <h1>{{ title() }}</h1>
        <p class="intro">Rutinas fitness con datos relacionales según la idea de v3.</p>
      </section>

      <section class="planner" aria-labelledby="planner-title">
        <header class="planner-header">
          <div>
            <h2 id="planner-title">Rutinas Fitness v3</h2>
            <p class="subtext">Separación de categorías, ejercicios y rutinas.</p>
          </div>
          <div class="summary">
            <span>{{ rutinas().length }}</span> rutinas •
            <span>{{ completedCount() }}</span> completadas
          </div>
        </header>

        <form class="workout-form" (ngSubmit)="addRutina();">
          <label class="field">
            <span class="label-text">Categoría</span>
            <select [ngModel]="categoriaSeleccionada()" (ngModelChange)="categoriaSeleccionada.set($event)" name="categoria">
              <option *ngFor="let categoria of categorias()" [ngValue]="categoria.id">
                {{ categoria.nombre }}
              </option>
            </select>
          </label>

          <label class="field">
            <span class="label-text">Ejercicio</span>
            <select [ngModel]="ejercicioSeleccionado()" (ngModelChange)="ejercicioSeleccionado.set($event)" name="ejercicio">
              <option *ngFor="let ejercicio of ejerciciosFiltrados()" [ngValue]="ejercicio.id">
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
              placeholder="Ej: 30 min"
              aria-label="Duración de la rutina"
            />
          </label>

          <button type="submit" [disabled]="!duracionNueva().trim()">Añadir</button>
        </form>

        <ul class="workout-list">
          <li class="workout-item" *ngFor="let rutina of rutinas()" [class.completed]="rutina.completada">
            <button
              type="button"
              class="check"
              [attr.aria-pressed]="rutina.completada"
              (click)="toggleRutina(rutina.id)"
            >
              {{ rutina.completada ? '✔' : '○' }}
            </button>
            <div class="info">
              <strong>{{ obtenerNombreCategoria(rutina.idCategoria) }} - {{ obtenerNombreEjercicio(rutina.idEjercicio) }}</strong>
              <span>Duración: {{ rutina.duracion }}</span>
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
        grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
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
      select,
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
export class AppV3 {
  protected readonly title = signal('Rutinas Fitness v3');

  protected readonly categorias = signal<Categoria[]>([
    { id: 1, nombre: 'Fuerza' },
    { id: 2, nombre: 'Flexibilidad' },
    { id: 3, nombre: 'Cardio' },
    { id: 4, nombre: 'Yoga' }
  ]);

  protected readonly ejercicios = signal<Ejercicio[]>([
    { id: 1, nombre: 'Sentadillas', idCategoria: 1 },
    { id: 2, nombre: 'Peso muerto', idCategoria: 1 },
    { id: 3, nombre: 'Estiramientos', idCategoria: 2 },
    { id: 4, nombre: 'Carrera continua', idCategoria: 3 },
    { id: 5, nombre: 'Saludo al sol', idCategoria: 4 }
  ]);

  protected readonly rutinas = signal<Rutina[]>([
    { id: 1, duracion: '20 min', completada: false, idCategoria: 1, idEjercicio: 1 },
    { id: 2, duracion: '30 min', completada: false, idCategoria: 2, idEjercicio: 3 },
    { id: 3, duracion: '40 min', completada: false, idCategoria: 3, idEjercicio: 4 },
    { id: 4, duracion: '25 min', completada: false, idCategoria: 4, idEjercicio: 5 }
  ]);

  protected readonly duracionNueva = signal('30 min');
  protected readonly categoriaSeleccionada = signal(1);
  protected readonly ejercicioSeleccionado = signal(1);

  protected readonly ejerciciosFiltrados = computed(() =>
    this.ejercicios().filter((ejercicio) => ejercicio.idCategoria === this.categoriaSeleccionada())
  );

  protected readonly completedCount = computed(
    () => this.rutinas().filter((rutina) => rutina.completada).length
  );

  protected addRutina(): void {
    const duracion = this.duracionNueva().trim();
    if (!duracion) return;

    const nextId = this.rutinas().reduce((max, rutina) => Math.max(max, rutina.id), 0) + 1;
    this.rutinas.update((items) => [
      ...items,
      {
        id: nextId,
        duracion,
        completada: false,
        idCategoria: this.categoriaSeleccionada(),
        idEjercicio: this.ejercicioSeleccionado()
      }
    ]);
    this.duracionNueva.set('30 min');
  }

  protected toggleRutina(id: number): void {
    this.rutinas.update((items) =>
      items.map((item) =>
        item.id === id ? { ...item, completada: !item.completada } : item
      )
    );
  }

  protected obtenerNombreCategoria(idCategoria: number): string {
    const categoria = this.categorias().find((item) => item.id === idCategoria);
    return categoria ? categoria.nombre : 'Categoría no encontrada';
  }

  protected obtenerNombreEjercicio(idEjercicio: number): string {
    const ejercicio = this.ejercicios().find((item) => item.id === idEjercicio);
    return ejercicio ? ejercicio.nombre : 'Ejercicio no encontrado';
  }
}

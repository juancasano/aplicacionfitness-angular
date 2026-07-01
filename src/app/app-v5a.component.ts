import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

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

interface RutinaFavoritaItem {
  id: number;
  idEjercicio: number;
  fecha: Date;
  completada: boolean;
}

@Component({
  standalone: true,
  selector: 'app-v5a',
  imports: [CommonModule, FormsModule],
  template: `
    <main class="page">
      <section class="hero">
        <p class="eyebrow">Versión 5A</p>
        <h1>{{ title() }}</h1>
        <p class="intro">Gestión de rutinas favoritas con ejercicios personalizados.</p>
      </section>

      <section class="planner" aria-labelledby="planner-title">
        <header class="planner-header">
          <div>
            <h2 id="planner-title">Rutinas Fitness v5a</h2>
            <p class="subtext">Agrega tus rutinas favoritas y controla el progreso de tu entrenamiento.</p>
          </div>
          <div class="summary">
            <span>{{ rutinasFavoritas().length }}</span> rutinas favoritas •
            <span>{{ completedCount() }}</span> completadas
          </div>
        </header>

        <div class="selector-grid">
          <div class="selector-card">
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

            <button type="button" (click)="addToRutinasFavoritas()" [disabled]="!ejercicioSeleccionado()">Agregar a rutinas favoritas</button>
          </div>

          <div class="preview-card" *ngIf="ejercicioSeleccionadoPreview() as ejercicio">
            <div class="imagen-preview">
              <img [src]="ejercicio.imagenUrl" [alt]="ejercicio.nombre" />
            </div>
            <div class="preview-content">
              <h3>{{ ejercicio.nombre }}</h3>
              <p>{{ ejercicio.descripcion }}</p>
            </div>
          </div>
        </div>

        <div class="playlist-section">
          <h3>Rutinas favoritas</h3>
          <ul class="playlist-list">
            <li *ngFor="let item of rutinasFavoritas()" class="playlist-item" [class.completed]="item.completada">
              <button type="button" class="check" [attr.aria-pressed]="item.completada" (click)="toggleRutinaFavoritaItem(item.id)">
                {{ item.completada ? '✔' : '○' }}
              </button>
              <div>
                <strong>{{ obtenerNombreEjercicio(item.idEjercicio) }}</strong>
                <span>Agregado: {{ item.fecha | date:'shortDate' }}</span>
                <span *ngIf="item.completada" class="status-badge">Completado</span>
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

      .selector-grid {
        display: grid;
        gap: 1.5rem;
      }

      .selector-card,
      .preview-card {
        background: #f8fafc;
        border-radius: 1rem;
        padding: 1.5rem;
      }

      .field {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        margin-bottom: 1rem;
      }

      .label-text {
        font-size: 0.9rem;
        color: #374151;
      }

      select,
      button {
        width: 100%;
        padding: 0.9rem 1rem;
        border: 2px solid #e5e7eb;
        border-radius: 0.85rem;
        font-size: 1rem;
      }

      button {
        border: 0;
        color: white;
        background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
        cursor: pointer;
        transition: all 0.2s ease;
      }

      button:hover:not(:disabled) {
        transform: translateY(-1px);
      }

      button:disabled {
        background: linear-gradient(135deg, #bfdbfe 0%, #93c5fd 100%);
        cursor: not-allowed;
      }

      .preview-card {
        display: grid;
        gap: 1rem;
      }

      .imagen-preview {
        overflow: hidden;
        border-radius: 1rem;
      }

      .imagen-preview img {
        width: 100%;
        height: 220px;
        object-fit: cover;
        display: block;
      }

      .playlist-section {
        margin-top: 1.5rem;
      }

      .playlist-list {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: 1rem;
      }

      .playlist-item {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 1rem;
        align-items: center;
        background: white;
        padding: 1rem;
        border-radius: 1rem;
        border: 1px solid #e5e7eb;
      }

      .playlist-item.completed {
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

      .check:hover {
        border-color: #2563eb;
      }

      .playlist-item strong {
        display: block;
        margin-bottom: 0.25rem;
      }

      .playlist-item.completed strong {
        text-decoration: line-through;
        color: #4b5563;
      }

      .playlist-item span {
        color: #6b7280;
        font-size: 0.9rem;
      }

      .status-badge {
        display: inline-flex;
        margin-top: 0.5rem;
        padding: 0.25rem 0.65rem;
        border-radius: 999px;
        background: #d1fae5;
        color: #166534;
        font-size: 0.8rem;
        font-weight: 700;
      }

      @media (min-width: 768px) {
        .selector-grid {
          grid-template-columns: 1fr 1.2fr;
          align-items: start;
        }
      }
    `
  ]
})
export class AppV5a {
  protected readonly title = signal('Rutinas favoritas');

  protected readonly categorias = signal<Categoria[]>([
    { id: 1, nombre: 'Fuerza' },
    { id: 2, nombre: 'Flexibilidad' },
    { id: 3, nombre: 'Cardio' },
    { id: 4, nombre: 'Yoga' }
  ]);

  protected readonly ejercicios = signal<Ejercicio[]>([
    {
      id: 1,
      nombre: 'Sentadillas con salto',
      idCategoria: 1,
      descripcion: 'Potencia piernas y explosividad en cada serie.',
      imagenUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="280"%3E%3Crect width="400" height="280" fill="%23240550"/%3E%3Ctext x="50%25" y="40%25" dominant-baseline="middle" text-anchor="middle" font-size="44" fill="%23fff"%3E💥%3C/text%3E%3Ctext x="50%25" y="66%25" dominant-baseline="middle" text-anchor="middle" font-size="26" fill="%23fff"%3ESentadillas%20con%20salto%3C/text%3E%3C/svg%3E'
    },
    {
      id: 2,
      nombre: 'Plancha lateral',
      idCategoria: 1,
      descripcion: 'Core estable para mejorar postura y fuerza media.',
      imagenUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="280"%3E%3Crect width="400" height="280" fill="%232f4f02"/%3E%3Ctext x="50%25" y="40%25" dominant-baseline="middle" text-anchor="middle" font-size="44" fill="%23fff"%3E🪵%3C/text%3E%3Ctext x="50%25" y="66%25" dominant-baseline="middle" text-anchor="middle" font-size="26" fill="%23fff"%3EPlancha%20lateral%3C/text%3E%3C/svg%3E'
    },
    {
      id: 5,
      nombre: 'Estiramientos dinámicos',
      idCategoria: 2,
      descripcion: 'Mejora movilidad y flexibilidad con movimientos suaves y controlados.',
      imagenUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="280"%3E%3Crect width="400" height="280" fill="%23006d5b"/%3E%3Ctext x="50%25" y="40%25" dominant-baseline="middle" text-anchor="middle" font-size="44" fill="%23fff"%3E🧘%3C/text%3E%3Ctext x="50%25" y="66%25" dominant-baseline="middle" text-anchor="middle" font-size="26" fill="%23fff"%3EEstiramientos%20dinámicos%3C/text%3E%3C/svg%3E'
    },
    {
      id: 3,
      nombre: 'Burpees',
      idCategoria: 3,
      descripcion: 'Cardio completo con salto, plancha y fuerza simultánea.',
      imagenUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="280"%3E%3Crect width="400" height="280" fill="%230f172a"/%3E%3Ctext x="50%25" y="40%25" dominant-baseline="middle" text-anchor="middle" font-size="44" fill="%23facc15"%3E🏃%3C/text%3E%3Ctext x="50%25" y="66%25" dominant-baseline="middle" text-anchor="middle" font-size="26" fill="%23fff"%3EBurpees%3C/text%3E%3C/svg%3E'
    },
    {
      id: 4,
      nombre: 'Saludo al sol',
      idCategoria: 4,
      descripcion: 'Rutina fluida de yoga para arrancar con energía y calma.',
      imagenUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="280"%3E%3Crect width="400" height="280" fill="%23386b92"/%3E%3Ctext x="50%25" y="40%25" dominant-baseline="middle" text-anchor="middle" font-size="44" fill="%23fff"%3E☀️%3C/text%3E%3Ctext x="50%25" y="66%25" dominant-baseline="middle" text-anchor="middle" font-size="26" fill="%23fff"%3ESaludo%20al%20sol%3C/text%3E%3C/svg%3E'
    }
  ]);

  protected readonly categoriaSeleccionada = signal(1);
  protected readonly ejercicioSeleccionado = signal(1);
  protected readonly rutinasFavoritas = signal<RutinaFavoritaItem[]>([]);

  protected readonly ejerciciosFiltrados = computed(() =>
    this.ejercicios().filter((item) => item.idCategoria === this.categoriaSeleccionada())
  );

  protected readonly ejercicioSeleccionadoPreview = computed(() =>
    this.ejercicios().find((item) => item.id === this.ejercicioSeleccionado())
  );

  protected readonly completedCount = computed(
    () => this.rutinasFavoritas().filter((item) => item.completada).length
  );

  protected addToRutinasFavoritas(): void {
    const selectedId = this.ejercicioSeleccionado();
    const exists = this.rutinasFavoritas().some((item) => item.idEjercicio === selectedId);
    if (exists) return;

    const nextId = this.rutinasFavoritas().reduce((max, item) => Math.max(max, item.id), 0) + 1;
    this.rutinasFavoritas.update((items) => [
      ...items,
      { id: nextId, idEjercicio: selectedId, fecha: new Date(), completada: false }
    ]);
  }

  protected toggleRutinaFavoritaItem(id: number): void {
    this.rutinasFavoritas.update((items) =>
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

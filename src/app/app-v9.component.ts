import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatosFitnessService } from './services/datos-fitness.service';
import { Categoria } from './models/categoria';
import { Ejercicio } from './models/ejercicio';
import { Rutina } from './models/rutina';

type TabType = 'misrutinas' | 'favoritas' | 'diarias' | 'semana';

interface DiaSemana {
  id: number;
  nombre: string;
  ejercicio: string;
  duracion: string;
  completado: boolean;
}

@Component({
  standalone: true,
  selector: 'app-v9',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <main class="page">
      <section class="hero">
        <h1>{{ title() }}</h1>
        <p class="intro">App final: rutinas, favoritas, diarias y plan semanal en un solo sitio.</p>
      </section>

      <section class="planner" aria-labelledby="planner-title">
        <header class="planner-header">
          <div>
            <h2 id="planner-title">Fitness Manager</h2>
            <p class="subtext">Crea y edita rutinas; usa las pestañas para favoritas, reto diario y semana.</p>
          </div>
          <div class="summary">
            <span>{{ rutinas().length }}</span> rutinas •
            <span>{{ ejercicios().length }}</span> ejercicios •
            <span>{{ categorias().length }}</span> categorías
          </div>
        </header>

        <section class="new-routine-section">
          <h3>{{ rutinaEditando() ? 'Editar rutina' : 'Crear nueva rutina' }}</h3>
          <form class="workout-form" [formGroup]="rutinasForm" (ngSubmit)="guardarRutina()">
            <label class="field">
              <span class="label-text">Categoría</span>
              <select formControlName="idCategoria">
                <option [ngValue]="null">Selecciona una categoría</option>
                <option *ngFor="let categoria of categorias()" [ngValue]="categoria.id">{{ categoria.nombre }}</option>
              </select>
            </label>

            <label class="field">
              <span class="label-text">Ejercicio ({{ ejerciciosFiltrados().length }})</span>
              <select formControlName="idEjercicio">
                <option [ngValue]="null">Selecciona un ejercicio</option>
                <option *ngFor="let ejercicio of ejerciciosFiltrados()" [ngValue]="ejercicio.id">{{ ejercicio.nombre }}</option>
              </select>
              <small class="field-hint" *ngIf="selectedCategoria() && ejerciciosFiltrados().length === 0">
                No hay ejercicios en esta categoría.
              </small>
            </label>

            <label class="field">
              <span class="label-text">Duración</span>
              <input type="text" formControlName="duracion" placeholder="Ej: 30 min" />
            </label>

            <label class="field">
              <span class="label-text">Tipo de rutina</span>
              <select formControlName="tipoRutina">
                <option value="normal">Normal</option>
                <option value="favorita">Favorita</option>
                <option value="diaria">Diaria</option>
              </select>
            </label>

            <div class="form-actions">
              <ng-container *ngIf="rutinaEditando(); else crearButton">
                <button type="submit" [disabled]="rutinasForm.invalid">Guardar cambios</button>
                <button type="button" class="boton-secundario" (click)="cancelarEdicion()">Cancelar edición</button>
              </ng-container>
              <ng-template #crearButton>
                <button type="submit" [disabled]="rutinasForm.invalid">Crear rutina</button>
              </ng-template>
            </div>

            <p class="error-formulario" *ngIf="rutinasForm.invalid && rutinasForm.touched">
              Completa todos los campos para crear la rutina.
            </p>
          </form>
        </section>

        <div class="status-messages" *ngIf="cargando() || error()">
          <div class="loading-message" *ngIf="cargando()">Cargando datos...</div>
          <div class="error-message" *ngIf="error()">{{ error() }}</div>
        </div>

        <div class="tabs-nav" *ngIf="!cargando() && !error()">
          <button 
            class="tab-button"
            [class.active]="tabActual() === 'misrutinas'"
            (click)="tabActual.set('misrutinas')">
            Mis rutinas
          </button>
          <button 
            class="tab-button"
            [class.active]="tabActual() === 'favoritas'"
            (click)="tabActual.set('favoritas')">
            Favoritas
          </button>
          <button 
            class="tab-button"
            [class.active]="tabActual() === 'diarias'"
            (click)="tabActual.set('diarias')">
            Diarias
          </button>
          <button
            class="tab-button"
            [class.active]="tabActual() === 'semana'"
            (click)="tabActual.set('semana')">
            Semana
          </button>
        </div>

        <div class="tab-content" *ngIf="tabActual() === 'misrutinas'">
          <div class="tab-header">
            <h3>Mis Rutinas</h3>
            <div class="tab-stats">{{ rutinasV3().length }} rutinas • {{ completedCountV3() }} completadas</div>
          </div>

          <ul class="workout-list">
              <li *ngFor="let rutina of rutinasV3()" class="workout-item" [class.completed]="rutina.completada">
              <button type="button" class="check" [attr.aria-pressed]="rutina.completada" (click)="toggleRutinaV3(rutina.id)">
                {{ rutina.completada ? '✔' : '○' }}
              </button>
              <div class="info">
                <strong>{{ obtenerNombreCategoriaV3(rutina.idCategoria) }} – {{ obtenerNombreEjercicioV3(rutina.idEjercicio) }}</strong>
                <span>Duración: {{ rutina.duracion }}</span>
                <span *ngIf="rutina.completada" class="status-badge">Completada</span>
              </div>
              <button type="button" class="edit-btn" (click)="editarRutinaById(rutina.id)" title="Editar">Editar</button>
              <button type="button" class="delete-btn" (click)="eliminarRutinaV3(rutina.id)" title="Eliminar">×</button>
            </li>
          </ul>
        </div>

        <div class="tab-content" *ngIf="tabActual() === 'favoritas'">
          <div class="tab-header">
            <h3>Rutinas Favoritas</h3>
            <div style="display:flex;gap:0.5rem;align-items:center">
              <div class="tab-stats">{{ rutinasFavoritas().length }} favoritas • {{ completedCountV5a() }} completadas</div>
              <button type="button" class="quick-create" (click)="crearAqui('favorita')" aria-label="Crear rutina favorita">＋ Crear aquí</button>
            </div>
          </div>

          <div class="playlist-section">
            <ul class="playlist-list">
                <li *ngFor="let item of rutinasFavoritas()" class="playlist-item" [class.completed]="item.completada">
                <button type="button" class="check" [attr.aria-pressed]="item.completada" (click)="toggleRutinaFavoritaItem(item.id)">
                  {{ item.completada ? '✔' : '○' }}
                </button>
                <div>
                  <strong>{{ obtenerNombreEjercicioV5a(item.idEjercicio) }}</strong>
                  <span>Agregado: {{ item.fecha | date:'shortDate' }}</span>
                  <span *ngIf="item.completada" class="status-badge">Completado</span>
                </div>
                <button type="button" class="edit-btn" (click)="editarRutinaById(item.id)" title="Editar">Editar</button>
                <button type="button" class="delete-btn" (click)="eliminarRutinaFavoritaItem(item.id)" title="Eliminar">×</button>
              </li>
            </ul>
          </div>
        </div>

        <div class="tab-content" *ngIf="tabActual() === 'diarias'">
          <div class="tab-header">
            <h3>Reto diario</h3>
            <div style="display:flex;gap:0.5rem;align-items:center">
              <div class="tab-stats">{{ rutinasV5b().length }} programadas • {{ completedCountV5b() }} completadas</div>
              <button type="button" class="quick-create" (click)="crearAqui('diaria')" aria-label="Crear rutina diaria">＋ Crear aquí</button>
            </div>
          </div>

          <div class="goals-card">
            <h3>Meta diaria</h3>
            <p>Completa al menos <strong>3 rutinas</strong> para cerrar el día.</p>
            <div class="progress-bar">
              <div class="progress-fill" [style.width]="progressPercentV5b() + '%'">
              </div>
            </div>
          </div>

          <div class="rutinas-list">
            <ul>
                <li *ngFor="let rutina of rutinasV5b()" [class.completed]="rutina.completada">
                <button type="button" class="check" [attr.aria-pressed]="rutina.completada" (click)="toggleRutinaV5b(rutina.id)">
                  {{ rutina.completada ? '✔' : '○' }}
                </button>
                <div class="rutina-info">
                  <strong>{{ obtenerNombreEjercicioV5b(rutina.idEjercicio) }}</strong>
                  <span>{{ rutina.duracion }}</span>
                  <span>{{ rutina.fecha | date:'shortTime' }}</span>
                  <span *ngIf="rutina.completada" class="status-badge">Completado</span>
                </div>
                <button type="button" class="edit-btn" (click)="editarRutinaById(rutina.id)" title="Editar">Editar</button>
                <button type="button" class="delete-btn" (click)="eliminarRutinaV5b(rutina.id)" title="Eliminar">×</button>
              </li>
            </ul>
          </div>
        </div>

        <div class="tab-content" *ngIf="tabActual() === 'semana'">
          <div class="tab-header">
            <h3>Plan semanal</h3>
            <div class="tab-stats">
              {{ weekPlan().length }} días • {{ completedDaysCount() }} completados • {{ completionPercentSemana() }}%
            </div>
          </div>
          <p class="semana-hint">Organiza el entreno de cada día (fuerza, cardio, recuperación…) y marca lo completado.</p>

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
            <h3>Detalle — {{ dia.nombre }}</h3>
            <p class="detail-text">Hoy toca <strong>{{ dia.ejercicio }}</strong> · {{ dia.duracion }}.</p>

            <label class="field">
              <span class="label-text">Modificar entrenamiento</span>
              <input
                type="text"
                [value]="dia.ejercicio"
                (input)="updateDayExercise($any($event.target).value)"
                aria-label="Ejercicio del día"
              />
            </label>

            <label class="field">
              <span class="label-text">Duración</span>
              <input
                type="text"
                [value]="dia.duracion"
                (input)="updateDayDuration($any($event.target).value)"
                aria-label="Duración del día"
              />
            </label>

            <button type="button" class="mark-button" (click)="toggleDayCompleted(dia.id)">
              {{ dia.completado ? 'Marcar como no completado' : 'Marcar como completado' }}
            </button>

            <div class="progress-card">
              <p>Progreso de la semana</p>
              <div class="progress-bar">
                <div class="progress-fill" [style.width]="completionPercentSemana() + '%'"></div>
              </div>
              <span>{{ completionPercentSemana() }}%</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  `,
  styles: [
    `
      :host {
        display: block;
        color: var(--ink);
        font-family: var(--font-body);
        padding: 0;
      }

      .page {
        max-width: none;
        margin: 0;
        display: grid;
        gap: 1.25rem;
        animation: rise-in 0.5s ease both;
      }

      .hero {
        padding: 1.5rem 1.6rem;
        border-radius: var(--radius);
        background:
          linear-gradient(120deg, rgba(200, 240, 66, 0.2), transparent 40%),
          linear-gradient(160deg, #163226, #10241c);
        color: #f4faf5;
        border: 1px solid rgba(200, 240, 66, 0.22);
      }

      .eyebrow {
        margin: 0 0 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        font-size: 0.72rem;
        color: var(--accent);
        font-weight: 700;
      }

      h1 {
        margin: 0;
        font-family: var(--font-display);
        font-size: clamp(1.8rem, 4vw, 2.6rem);
        line-height: 1.05;
        letter-spacing: -0.03em;
      }

      .intro {
        margin: 0.75rem 0 0;
        max-width: 40rem;
        color: rgba(244, 250, 245, 0.8);
        font-size: 1rem;
        line-height: 1.55;
      }

      .planner {
        background: rgba(251, 253, 251, 0.92);
        border-radius: var(--radius);
        padding: 1.35rem 1.35rem 1.5rem;
        border: 1px solid var(--line);
        box-shadow: var(--shadow);
      }

      .planner-header {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 1rem;
        align-items: center;
        margin-bottom: 1.25rem;
      }

      .planner-header h2 {
        margin: 0;
        font-family: var(--font-display);
        font-size: 1.25rem;
      }

      .subtext {
        margin: 0.4rem 0 0;
        color: var(--muted);
      }

      .summary {
        font-weight: 700;
        color: var(--ink);
        background: var(--surface-2);
        padding: 0.55rem 0.8rem;
        border-radius: var(--radius-sm);
      }

      .new-routine-section {
        margin-bottom: 1.5rem;
        padding: 1.25rem;
        border-radius: var(--radius-sm);
        background: var(--surface);
        border: 1px solid var(--line);
      }

      .new-routine-section h3 {
        margin-top: 0;
        margin-bottom: 1rem;
        font-family: var(--font-display);
        color: var(--ink);
      }

      .field-hint {
        display: block;
        margin-top: 0.35rem;
        color: var(--danger, #c23b2a);
        font-size: 0.82rem;
      }

      .status-messages {
        display: grid;
        gap: 1rem;
        margin-bottom: 1.5rem;
      }

      .loading-message {
        background: linear-gradient(135deg, #fef08a 0%, #fef3c7 100%);
        border: 1px solid #facc15;
        border-radius: 0.85rem;
        padding: 1rem 1.25rem;
        color: #92400e;
      }

      .error-message {
        background: linear-gradient(135deg, #fecaca 0%, #fca5a5 100%);
        border: 1px solid #f87171;
        border-radius: 0.85rem;
        padding: 1rem 1.25rem;
        color: #7c2d12;
      }

      .tabs-nav {
        display: flex;
        flex-wrap: wrap;
        gap: 0.35rem;
        margin-bottom: 1.35rem;
        border-bottom: 1px solid var(--line);
      }

      .tab-button {
        flex: 1 1 6.5rem;
        padding: 0.8rem 0.7rem;
        border: none;
        background: transparent;
        color: var(--muted);
        font-weight: 700;
        font-size: 0.92rem;
        cursor: pointer;
        border-bottom: 3px solid transparent;
        transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
        margin-bottom: -1px;
      }

      .semana-hint {
        margin: -0.5rem 0 1.25rem;
        color: #64748b;
        font-size: 0.95rem;
      }

      .week-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(8.5rem, 1fr));
        gap: 0.75rem;
        margin-bottom: 1.25rem;
      }

      .day-card {
        display: grid;
        gap: 0.35rem;
        text-align: left;
        padding: 0.9rem;
        border: 2px solid #e2e8f0;
        border-radius: 1rem;
        background: #fff;
        color: #0f172a;
        cursor: pointer;
        font: inherit;
      }

      .day-card span {
        font-size: 0.85rem;
        color: #64748b;
      }

      .day-card.active {
        border-color: var(--accent-deep);
        box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
      }

      .day-card.completed {
        background: #ecfdf5;
        border-color: #6ee7b7;
      }

      .day-details {
        display: grid;
        gap: 1rem;
        padding: 1.25rem;
        border-radius: 1rem;
        background: #f8fafc;
        border: 1px solid #e2e8f0;
      }

      .day-details h3 {
        margin: 0;
      }

      .detail-text {
        margin: 0;
        color: #334155;
      }

      .mark-button {
        border: 0;
        border-radius: 0.95rem;
        padding: 0.9rem 1.25rem;
        background: linear-gradient(135deg, #163226 0%, #10241c 100%);
        color: var(--accent);
        font-weight: 700;
        cursor: pointer;
        width: fit-content;
      }

      .progress-card {
        background: #eff6ff;
        padding: 1rem;
        border-radius: 1rem;
        border: 1px solid #dbeafe;
      }

      .tab-button:hover {
        color: var(--ink);
        background: var(--surface-2);
      }

      .tab-button.active {
        color: var(--ink);
        border-bottom-color: var(--accent-deep);
        background: linear-gradient(180deg, transparent, rgba(200, 240, 66, 0.18));
      }

      .tab-content {
        animation: fadeIn 0.3s ease;
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      .tab-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
      }

      .tab-header h3 {
        margin: 0;
        font-size: 1.1rem;
        color: #111827;
      }

      .tab-stats {
        font-weight: 700;
        color: var(--accent-deep);
        font-size: 0.9rem;
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
        font-weight: 500;
      }

      select,
      input {
        width: 100%;
        padding: 0.65rem 1rem;
        border: 2px solid #e5e7eb;
        border-radius: 0.75rem;
        font-size: 1rem;
        background: white;
        transition: all 0.3s ease;
      }

      select:focus,
      input:focus {
        outline: none;
        border-color: var(--accent-deep);
        box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
      }

      button {
        border: 0;
        border-radius: 0.75rem;
        padding: 0.65rem 1.75rem;
        font-weight: 600;
        color: white;
        background: linear-gradient(135deg, #163226 0%, #10241c 100%);
        color: var(--accent);
        cursor: pointer;
        transition: all 0.3s ease;
      }

      button:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(37, 99, 235, 0.25);
      }

      button:disabled {
        background: linear-gradient(135deg, #bfdbfe 0%, #93c5fd 100%);
        cursor: not-allowed;
      }

      .form-actions {
        display: flex;
        align-items: flex-end;
      }

      .error-formulario {
        grid-column: 1 / -1;
        color: #b91c1c;
        font-weight: 700;
      }

      .delete-btn {
        background: #ef4444;
        padding: 0.5rem 1rem;
        font-size: 1.2rem;
        line-height: 1;
      }

      .delete-btn:hover:not(:disabled) {
        background: #dc2626;
      }

      .workout-list,
      .playlist-list,
      .rutinas-list ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: 1rem;
      }

      .workout-item,
      .playlist-item,
      .rutinas-list li {
        display: grid;
        grid-template-columns: auto 1fr auto;
        gap: 1rem;
        align-items: center;
        padding: 1rem;
        border-radius: 1rem;
        background: #f8fafc;
        border: 1px solid #e5e7eb;
        transition: all 0.3s ease;
      }

      .workout-item:hover,
      .playlist-item:hover,
      .rutinas-list li:hover {
        background: #f1f5f9;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      }

      .workout-item.completed,
      .playlist-item.completed,
      .rutinas-list li.completed {
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
        padding: 0;
      }

      .check[aria-pressed="true"] {
        background: linear-gradient(135deg, #163226 0%, #10241c 100%);
        color: var(--accent);
        border-color: var(--ink);
      }

      .info,
      .rutina-info {
        display: grid;
        line-height: 1.4;
        gap: 0.25rem;
      }

      .info strong,
      .rutina-info strong {
        display: block;
        margin-bottom: 0.25rem;
      }

      .info span,
      .rutina-info span {
        color: #6b7280;
        font-size: 0.9rem;
      }

      .playlist-section {
        margin-top: 2rem;
      }

      .playlist-item {
        background: #f8fafc;
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

      .goals-card {
        background: linear-gradient(135deg, #f0f4ff 0%, #f0f9ff 100%);
        border-radius: 1rem;
        padding: 1.75rem;
        margin-bottom: 2rem;
        border: 2px solid #dbeafe;
      }

      .goals-card h3 {
        margin: 0 0 1rem;
        color: #111827;
      }

      .goals-card p {
        margin: 0 0 1rem;
        color: #374151;
      }

      .progress-bar {
        height: 12px;
        background: #e5e7eb;
        border-radius: 999px;
        overflow: hidden;
      }

      .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, var(--accent-deep) 0%, #163226 100%);
        border-radius: 999px;
        transition: width 0.3s ease;
      }

      @media (max-width: 640px) {
        .workout-item,
        .playlist-item,
        .rutinas-list li {
          grid-template-columns: auto 1fr;
        }

        .delete-btn {
          grid-column: 2;
          justify-self: end;
        }

        .tabs-nav {
          overflow-x: auto;
        }

        .tab-button {
          flex: 0 0 auto;
          white-space: nowrap;
        }

        .workout-form {
          grid-template-columns: 1fr;
        }
      }
    `
  ]
})
export class AppV9 implements OnInit {
  private datosFitnessService = inject(DatosFitnessService);

  protected readonly title = signal('Fitness Manager');
  protected readonly rutinaEditando = signal<Rutina | null>(null);
  protected readonly categorias = signal<Categoria[]>([]);
  protected readonly ejercicios = signal<Ejercicio[]>([]);
  protected readonly rutinas = signal<Rutina[]>([]);
  protected readonly cargando = signal(false);
  protected readonly error = signal('');
  protected readonly tabActual = signal<TabType>('misrutinas');

  protected readonly rutinasV3 = signal<Rutina[]>([]);
  protected readonly rutinasFavoritas = signal<RutinaFavoritaItem[]>([]);
  protected readonly rutinasV5b = signal<Array<{ id: number; idEjercicio: number; duracion: string; completada: boolean; fecha: string }>>([]);

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
  protected readonly completedDaysCount = computed(
    () => this.weekPlan().filter((dia) => dia.completado).length
  );

  protected readonly rutinasForm = new FormGroup({
    idCategoria: new FormControl<number | null>(null, Validators.required),
    idEjercicio: new FormControl<number | null>(null, Validators.required),
    duracion: new FormControl('30 min', [Validators.required, Validators.minLength(1)]),
    tipoRutina: new FormControl<'normal' | 'favorita' | 'diaria'>('normal')
  });

  // Señal que representa la categoría seleccionada (hace reactivo el filtrado)
  protected readonly selectedCategoria = signal<number | null>(null);

  protected readonly ejerciciosFiltrados = computed(() =>
    this.ejercicios().filter((ej) => ej.idCategoria === this.selectedCategoria())
  );

  protected readonly completedCountV3 = computed(() => this.rutinasV3().filter((r) => r.completada).length);
  protected readonly completedCountV5a = computed(() => this.rutinasFavoritas().filter((r) => r.completada).length);
  protected readonly completedCountV5b = computed(() => this.rutinasV5b().filter((r) => r.completada).length);
  protected readonly progressPercentV5b = computed(() => Math.min(100, (this.completedCountV5b() / 3) * 100));

  async ngOnInit(): Promise<void> {
    await this.cargarDatos();
  }

  constructor() {
    // sincronizar la señal con el FormControl para hacer reactivo el filtrado
    this.rutinasForm.controls.idCategoria.valueChanges.subscribe((val) => {
      const catId = val ?? null;
      this.selectedCategoria.set(catId);
      // al cambiar de categoría, seleccionar por defecto el primer ejercicio de esa categoría
      if (catId != null) {
        const primerEj = this.ejercicios().find((ej) => ej.idCategoria === catId)?.id ?? null;
        if (primerEj != null) {
          this.rutinasForm.controls.idEjercicio.setValue(primerEj);
        } else {
          this.rutinasForm.controls.idEjercicio.setValue(null);
        }
      } else {
        this.rutinasForm.controls.idEjercicio.setValue(null);
      }
    });

    effect(() => {
      const r = this.rutinaEditando();
      if (r) {
        this.rutinasForm.patchValue({
          idCategoria: r.idCategoria ?? null,
          idEjercicio: r.idEjercicio ?? null,
          duracion: r.duracion ?? '30 min',
          tipoRutina: r.favorita ? 'favorita' : r.diaria ? 'diaria' : 'normal'
        });
      }
    });
  }

  private async cargarDatos(options: { resetForm?: boolean } = {}): Promise<void> {
    const resetForm = options.resetForm ?? true;
    this.cargando.set(true);
    this.error.set('');

    try {
      const categorias = await this.datosFitnessService.obtenerCategorias();
      const ejercicios = await this.datosFitnessService.obtenerEjercicios();
      const rutinas = await this.datosFitnessService.obtenerRutinas();

      this.categorias.set(categorias);
      this.ejercicios.set(ejercicios);
      this.rutinas.set(rutinas);

      const rutinasFavoritas = rutinas
        .filter((rutina) => rutina.favorita)
        .map((rutina) => ({
          id: rutina.id,
          idEjercicio: rutina.idEjercicio,
          fecha: rutina.created_at ? String(rutina.created_at) : new Date().toISOString(),
          completada: rutina.completada
        }));

      const rutinasDiarias = rutinas
        .filter((rutina) => rutina.diaria)
        .map((rutina) => ({
          id: rutina.id,
          idEjercicio: rutina.idEjercicio,
          duracion: rutina.duracion,
          completada: rutina.completada,
          fecha: rutina.created_at ? String(rutina.created_at) : new Date().toISOString()
        }));

      const rutinasNormales = rutinas.filter((rutina) => !rutina.favorita && !rutina.diaria);

      this.rutinasV3.set(rutinasNormales);
      this.rutinasFavoritas.set(rutinasFavoritas);
      this.rutinasV5b.set(rutinasDiarias);

      if (resetForm) {
        if (categorias.length > 0) {
          this.rutinasForm.controls.idCategoria.setValue(categorias[0].id);
          this.selectedCategoria.set(categorias[0].id);
        }
        const categoriaAct = this.rutinasForm.controls.idCategoria.value;
        const primerPorCategoria =
          ejercicios.find((ej) => ej.idCategoria === categoriaAct)?.id ?? ejercicios[0]?.id ?? null;
        this.rutinasForm.controls.idEjercicio.setValue(primerPorCategoria);
      } else {
        const catId = this.rutinasForm.controls.idCategoria.value;
        this.selectedCategoria.set(catId);
        const ejercicioActual = this.rutinasForm.controls.idEjercicio.value;
        const sigueValido = ejercicios.some(
          (ej) => ej.id === ejercicioActual && ej.idCategoria === catId
        );
        if (!sigueValido) {
          const primer = ejercicios.find((ej) => ej.idCategoria === catId)?.id ?? null;
          this.rutinasForm.controls.idEjercicio.setValue(primer);
        }
      }
    } catch (err) {
      console.error(err);
      this.error.set('No se han podido cargar los datos.');
    } finally {
      this.cargando.set(false);
    }
  }

  protected toggleRutinaV3(id: number): void {
    const rutina = this.rutinasV3().find((r) => r.id === id);
    if (!rutina) return;

    const updated = { ...rutina, completada: !rutina.completada };
    this.datosFitnessService.actualizarRutina(id, { completada: updated.completada }).then(() => {
      this.rutinasV3.update((items) => items.map((item) => item.id === id ? updated : item));
    }).catch((err) => {
      console.error('Error al actualizar rutina:', err);
      this.error.set('Error al actualizar rutina en Supabase');
    });
  }

  protected async eliminarRutinaV3(id: number): Promise<void> {
    if (!confirm('¿Seguro que quieres borrar esta rutina?')) return;
    try {
      await this.datosFitnessService.eliminarRutina(id);
      await this.cargarDatos({ resetForm: false });
    } catch (err) {
      console.error('Error al eliminar rutina:', err);
      this.error.set('No se pudo eliminar la rutina.');
    }
  }

  protected editarRutina(rutina: Rutina): void {
    this.rutinaEditando.set(rutina);
  }

  protected editarRutinaById(id: number): void {
    const r = this.rutinas().find((x) => x.id === id);
    if (r) this.rutinaEditando.set(r);
  }

  protected async guardarRutina(): Promise<void> {
    if (this.rutinasForm.invalid) {
      this.rutinasForm.markAllAsTouched();
      return;
    }

    const tipo = this.rutinasForm.controls.tipoRutina.value ?? 'normal';
    const cambios: Omit<Rutina, 'id'> = {
      duracion: this.rutinasForm.controls.duracion.value?.trim() || '30 min',
      completada: false,
      favorita: tipo === 'favorita',
      diaria: tipo === 'diaria',
      idCategoria: this.rutinasForm.controls.idCategoria.value ?? 1,
      idEjercicio: this.rutinasForm.controls.idEjercicio.value ?? 1
    };

    const editando = this.rutinaEditando();
    try {
      this.cargando.set(true);
      this.error.set('');

      if (editando) {
        await this.datosFitnessService.actualizarRutina(editando.id, {
          duracion: cambios.duracion,
          favorita: cambios.favorita,
          diaria: cambios.diaria,
          idCategoria: cambios.idCategoria,
          idEjercicio: cambios.idEjercicio
        });
        this.rutinaEditando.set(null);
      } else {
        await this.datosFitnessService.crearRutina(cambios);
      }

      await this.cargarDatos({ resetForm: false });
      this.rutinasForm.controls.duracion.setValue('30 min');
      this.rutinasForm.controls.tipoRutina.setValue('normal');

      if (tipo === 'favorita') this.tabActual.set('favoritas');
      else if (tipo === 'diaria') this.tabActual.set('diarias');
      else this.tabActual.set('misrutinas');
    } catch (err) {
      console.error('Error al guardar rutina:', err);
      this.error.set('No se pudo guardar la rutina.');
    } finally {
      this.cargando.set(false);
    }
  }

  protected cancelarEdicion(): void {
    this.rutinaEditando.set(null);
    this.rutinasForm.reset({ duracion: '30 min', tipoRutina: 'normal', idCategoria: this.categorias()[0]?.id ?? null, idEjercicio: this.ejercicios()[0]?.id ?? null });
  }

  protected crearAqui(tipo: 'normal' | 'favorita' | 'diaria'): void {
    this.rutinasForm.controls.tipoRutina.setValue(tipo as any);
    setTimeout(() => {
      const el = document.querySelector('.new-routine-section');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const input = document.querySelector('input[formcontrolname="duracion"]') as HTMLElement | null;
      input?.focus();
    }, 100);
  }

  protected obtenerNombreCategoriaV3(idCategoria: number): string {
    return this.categorias().find((cat) => cat.id === idCategoria)?.nombre ?? 'Desconocida';
  }

  protected obtenerNombreEjercicioV3(idEjercicio: number): string {
    return this.ejercicios().find((ej) => ej.id === idEjercicio)?.nombre ?? 'Desconocido';
  }

  protected toggleRutinaFavoritaItem(id: number): void {
    const item = this.rutinasFavoritas().find((r) => r.id === id);
    if (!item) return;

    this.datosFitnessService.actualizarRutina(id, { completada: !item.completada }).then(() => {
      this.rutinasFavoritas.update((items) => items.map((i) => i.id === id ? { ...i, completada: !i.completada } : i));
    }).catch((err) => {
      console.error('Error al actualizar favorita:', err);
      this.error.set('Error al actualizar en Supabase');
    });
  }

  protected async eliminarRutinaFavoritaItem(id: number): Promise<void> {
    if (!confirm('¿Seguro que quieres borrar esta rutina?')) return;
    try {
      await this.datosFitnessService.eliminarRutina(id);
      await this.cargarDatos({ resetForm: false });
    } catch (err) {
      console.error('Error al eliminar favorita:', err);
      this.error.set('No se pudo eliminar la rutina.');
    }
  }

  protected obtenerNombreEjercicioV5a(idEjercicio: number): string {
    return this.ejercicios().find((ej) => ej.id === idEjercicio)?.nombre ?? 'Desconocido';
  }

  protected toggleRutinaV5b(id: number): void {
    const rutina = this.rutinasV5b().find((r) => r.id === id);
    if (!rutina) return;

    this.datosFitnessService.actualizarRutina(id, { completada: !rutina.completada }).then((updatedRutina) => {
      this.rutinasV5b.update((items) => items.map((item) => item.id === id ? { ...item, completada: !item.completada } : item));
    }).catch((err) => {
      console.error('Error al actualizar rutina diaria:', err);
      this.error.set('Error al actualizar en Supabase');
    });
  }

  protected async eliminarRutinaV5b(id: number): Promise<void> {
    if (!confirm('¿Seguro que quieres borrar esta rutina?')) return;
    try {
      await this.datosFitnessService.eliminarRutina(id);
      await this.cargarDatos({ resetForm: false });
    } catch (err) {
      console.error('Error al eliminar rutina diaria:', err);
      this.error.set('No se pudo eliminar la rutina.');
    }
  }

  protected obtenerNombreEjercicioV5b(idEjercicio: number): string {
    return this.ejercicios().find((ej) => ej.id === idEjercicio)?.nombre ?? 'Desconocido';
  }

  protected completionPercentSemana(): number {
    const total = this.weekPlan().length;
    if (total === 0) return 0;
    return Math.round((this.completedDaysCount() / total) * 100);
  }

  protected toggleDayCompleted(id: number): void {
    this.weekPlan.update((items) =>
      items.map((dia) => (dia.id === id ? { ...dia, completado: !dia.completado } : dia))
    );
  }

  protected updateDayExercise(value: string): void {
    this.weekPlan.update((items) =>
      items.map((dia) => (dia.id === this.selectedDay() ? { ...dia, ejercicio: value } : dia))
    );
  }

  protected updateDayDuration(value: string): void {
    this.weekPlan.update((items) =>
      items.map((dia) => (dia.id === this.selectedDay() ? { ...dia, duracion: value } : dia))
    );
  }
}

interface RutinaFavoritaItem {
  id: number;
  idEjercicio: number;
  fecha: string;
  completada: boolean;
}

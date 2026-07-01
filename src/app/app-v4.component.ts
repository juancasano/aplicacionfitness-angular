import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DatosFitnessService } from './services/datos-fitness.service';
import { Categoria } from './models/categoria';
import { Ejercicio } from './models/ejercicio';
import { Rutina } from './models/rutina';

@Component({
  standalone: true,
  selector: 'app-v4',
  imports: [CommonModule, FormsModule],
  template: `
    <main class="page">
      <section class="hero">
        <p class="eyebrow">Versión 4 - Multimedia</p>
        <h1>{{ title() }}</h1>
        <p class="intro">Versión avanzada con galería de ejercicios, videos explicativos y seguimiento visual del progreso.</p>
      </section>

      <section class="planner" aria-labelledby="planner-title">
        <header class="planner-header">
          <div>
            <h2 id="planner-title">Rutinas Fitness v4</h2>
            <p class="subtext">Galería de ejercicios con imágenes y videos explicativos.</p>
          </div>
          <div class="summary">
            <span>{{ rutinas().length }}</span> rutinas •
            <span>{{ completedCount() }}</span> completadas
          </div>
        </header>

        <!-- Galería de categorías -->
        <div class="categorias-gallery">
          <h3>Categorías de Ejercicio</h3>
          <div class="categorias-grid">
            <div 
              *ngFor="let categoria of categorias()" 
              class="categoria-card"
              [class.active]="categoriaSeleccionada() === categoria.id"
              (click)="categoriaSeleccionada.set(categoria.id)">
              <div class="categoria-icon">
                <span *ngIf="categoria.id === 1">💪</span>
                <span *ngIf="categoria.id === 2">🧘</span>
                <span *ngIf="categoria.id === 3">🏃</span>
                <span *ngIf="categoria.id === 4">翯</span>
              </div>
              <h4>{{ categoria.nombre }}</h4>
            </div>
          </div>
        </div>

        <!-- Selector de ejercicio con galería -->
        <div class="ejercicio-selector">
          <h3>Ejercicios</h3>
          <div class="ejercicios-grid">
            <div 
              *ngFor="let ejercicio of ejerciciosFiltrados()" 
              class="ejercicio-card"
              [class.selected]="ejercicioSeleccionado() === ejercicio.id"
              (click)="ejercicioSeleccionado.set(ejercicio.id)">
              <div class="ejercicio-imagen">
                <img [src]="ejercicio.imagenUrl || 'https://placehold.co/200x150?text=' + ejercicio.nombre" 
                     [alt]="ejercicio.nombre"
                     (error)="onImageError($event)">
              </div>
              <h4>{{ ejercicio.nombre }}</h4>
              <p>{{ ejercicio.descripcion }}</p>
              <div class="ejercicio-video-indicator" *ngIf="ejercicio.videoUrl">
                🎥 Video disponible
              </div>
            </div>
          </div>
        </div>

        <!-- Reproductor de video para el ejercicio seleccionado -->
        <div class="video-section" *ngIf="ejercicioSeleccionadoVideo()">
          <h3>Video Explicativo</h3>
          <div class="video-container">
            <iframe
              width="100%"
              height="100%"
              [src]="ejercicioSeleccionadoVideoUrl()"
              title="Video explicativo de ejercicio"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>

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
              aria-label="Duración de la rutina" />
          </label>

          <button type="submit" [disabled]="!duracionNueva().trim()">Añadir Rutina</button>
        </form>

        <!-- Lista de rutinas -->
        <div class="rutinas-section">
          <h3>Mis Rutinas</h3>
          <ul class="workout-list">
            <li class="workout-item" *ngFor="let rutina of rutinas()" [class.completed]="rutina.completada">
              <button
                type="button"
                class="check"
                [attr.aria-pressed]="rutina.completada"
                (click)="toggleRutina(rutina.id)">
                {{ rutina.completada ? '✔' : '○' }}
              </button>
              <div class="info">
                <strong>{{ obtenerNombreCategoria(rutina.idCategoria) }} - {{ obtenerNombreEjercicio(rutina.idEjercicio) }}</strong>
                <span>Duración: {{ rutina.duracion }}</span>
                <span>Fecha: {{ rutina.created_at | date:'short' }}</span>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </main>
  `,
  styles: [`
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

    .categorias-gallery {
      margin-bottom: 2rem;
    }

    .categorias-gallery h3 {
      margin-bottom: 1rem;
      color: #1f2937;
    }

    .categorias-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 1rem;
    }

    .categoria-card {
      background: #f8fafc;
      border-radius: 1rem;
      padding: 1.5rem 1rem;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s ease;
      border: 2px solid transparent;
    }

    .categoria-card:hover {
      background: #f1f5f9;
      transform: translateY(-2px);
    }

    .categoria-card.active {
      background: #dbeafe;
      border-color: #2563eb;
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.15);
    }

    .categoria-icon {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }

    .categoria-card h4 {
      margin: 0;
      font-size: 0.9rem;
      color: #1f2937;
    }

    .ejercicio-selector {
      margin-bottom: 2rem;
    }

    .ejercicio-selector h3 {
      margin-bottom: 1rem;
      color: #1f2937;
    }

    .ejercicios-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1.5rem;
    }

    .ejercicio-card {
      background: #f8fafc;
      border-radius: 1rem;
      overflow: hidden;
      cursor: pointer;
      transition: all 0.3s ease;
      border: 2px solid transparent;
    }

    .ejercicio-card:hover {
      background: #f1f5f9;
      transform: translateY(-2px);
      box-shadow: 0 6px 15px rgba(15, 23, 42, 0.1);
    }

    .ejercicio-card.selected {
      background: #dbeafe;
      border-color: #2563eb;
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.15);
    }

    .ejercicio-imagen {
      height: 150px;
      overflow: hidden;
    }

    .ejercicio-imagen img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .ejercicio-card h4 {
      margin: 0.75rem 0 0.25rem;
      padding: 0 0.75rem;
      font-size: 1rem;
      color: #1f2937;
    }

    .ejercicio-card p {
      margin: 0 0 0.75rem;
      padding: 0 0.75rem;
      font-size: 0.85rem;
      color: #6b7280;
      line-height: 1.4;
    }

    .ejercicio-video-indicator {
      padding: 0.5rem 0.75rem;
      background: #dcfce7;
      color: #166534;
      font-size: 0.8rem;
      font-weight: 500;
      text-align: center;
      border-top: 1px solid #bbf7d0;
    }

    .video-section {
      margin-bottom: 2rem;
      background: #f8fafc;
      border-radius: 1rem;
      padding: 1.5rem;
    }

    .video-section h3 {
      margin-bottom: 1rem;
      color: #1f2937;
    }

    .video-container {
      position: relative;
      background: #1f2937;
      border-radius: 0.75rem;
      overflow: hidden;
      aspect-ratio: 16 / 9;
      min-height: 250px;
    }

    .video-container iframe,
    .video-container video {
      width: 100%;
      height: 100%;
      display: block;
      border: 0;
    }

    .workout-form {
      display: grid;
      gap: 0.85rem;
      grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
      align-items: flex-end;
      margin-bottom: 1.5rem;
      padding: 1.5rem;
      background: #f8fafc;
      border-radius: 1rem;
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
    input,
    textarea {
      width: 100%;
      padding: 0.65rem 1rem;
      border: 2px solid #e5e7eb;
      border-radius: 0.75rem;
      font-size: 1rem;
      background: white;
      color: #111827;
      transition: all 0.3s ease;
    }

    select:focus,
    input:focus,
    textarea:focus {
      outline: none;
      border-color: #2563eb;
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }

    select:hover,
    input:hover,
    textarea:hover {
      border-color: #d1d5db;
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

    .workout-list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: grid;
      gap: 1rem;
    }

    .workout-item {
      display: grid;
      grid-template-columns: auto 1fr auto;
      gap: 1rem;
      align-items: center;
      background: #f8fafc;
      padding: 1rem;
      border-radius: 1.1rem;
    }

    .workout-item.completed {
      opacity: 0.75;
    }

    .check {
      width: 2.8rem;
      height: 2.8rem;
      border-radius: 50%;
      border: 2.5px solid #e5e7eb;
      background: white;
      color: #111827;
      font-size: 1.3rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.3s ease;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .check:hover {
      border-color: #2563eb;
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.08);
    }

    .check[aria-pressed="true"] {
      background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
      color: white;
      border-color: #1d4ed8;
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
    }

    .info {
      display: grid;
      line-height: 1.4;
    }

    .info strong {
      display: block;
      margin-bottom: 0.25rem;
    }

    .info span {
      color: #6b7280;
    }

    @media (max-width: 640px) {
      .workout-form {
        grid-template-columns: 1fr;
      }

      .planner-header {
        align-items: flex-start;
      }
      
      .workout-item {
        grid-template-columns: auto 1fr;
      }
    }
  `]
})
export class AppV4 implements OnInit {
  private readonly sanitizer = inject(DomSanitizer);
  private readonly datosFitnessService = inject(DatosFitnessService);

  protected readonly title = signal('Rutinas Fitness v4');

  protected readonly categorias = signal<Categoria[]>([]);
  protected readonly ejercicios = signal<Ejercicio[]>([]);
  protected readonly rutinas = signal<Rutina[]>([]);

  protected readonly duracionNueva = signal('30 min');
  protected readonly categoriaSeleccionada = signal(1);
  protected readonly ejercicioSeleccionado = signal(1);

  async ngOnInit(): Promise<void> {
    try {
      const [categorias, ejercicios, rutinas] = await Promise.all([
        this.datosFitnessService.obtenerCategorias(),
        this.datosFitnessService.obtenerEjercicios(),
        this.datosFitnessService.obtenerRutinas()
      ]);
      this.categorias.set(categorias);
      this.ejercicios.set(ejercicios);
      this.rutinas.set(rutinas);

      if (categorias.length > 0) this.categoriaSeleccionada.set(categorias[0].id);
      if (ejercicios.length > 0) this.ejercicioSeleccionado.set(ejercicios[0].id);
    } catch (err) {
      console.error('Error cargando datos:', err);
    }
  }

  protected readonly ejerciciosFiltrados = computed(() =>
    this.ejercicios().filter((ejercicio) => ejercicio.idCategoria === this.categoriaSeleccionada())
  );

  protected readonly ejercicioSeleccionadoVideo = computed(() =>
    this.ejercicios().find((ejercicio) => ejercicio.id === this.ejercicioSeleccionado())
  );

  protected readonly ejercicioSeleccionadoVideoUrl = computed<SafeResourceUrl | undefined>(() => {
    const ejercicio = this.ejercicioSeleccionadoVideo();
    const videoUrl = (ejercicio as any)?.videoUrl;
    return videoUrl ? this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl) : undefined;
  });

  protected readonly completedCount = computed(
    () => this.rutinas().filter((rutina) => rutina.completada).length
  );

  protected addRutina(): void {
    const duracion = this.duracionNueva().trim();
    if (!duracion) return;

    const nuevaRutina: Omit<Rutina, 'id'> = {
      duracion,
      completada: false,
      idCategoria: this.categoriaSeleccionada(),
      idEjercicio: this.ejercicioSeleccionado()
    };

    this.datosFitnessService.crearRutina(nuevaRutina).then((rutina) => {
      this.rutinas.update((items) => [...items, rutina]);
      this.duracionNueva.set('30 min');
    }).catch((err) => {
      console.error('Error al crear rutina:', err);
    });
  }

  protected toggleRutina(id: number): void {
    const rutina = this.rutinas().find((r) => r.id === id);
    if (!rutina) return;

    const updated = { ...rutina, completada: !rutina.completada };
    this.datosFitnessService.actualizarRutina(id, { completada: updated.completada }).then(() => {
      this.rutinas.update((items) =>
        items.map((item) =>
          item.id === id ? updated : item
        )
      );
    }).catch((err) => {
      console.error('Error al actualizar rutina:', err);
    });
  }

  protected eliminarRutina(id: number): void {
    this.datosFitnessService.eliminarRutina(id).then(() => {
      this.rutinas.update((items) => items.filter((item) => item.id !== id));
    }).catch((err) => {
      console.error('Error al eliminar rutina:', err);
    });
  }

  protected obtenerNombreCategoria(idCategoria: number): string {
    const categoria = this.categorias().find((item) => item.id === idCategoria);
    return categoria ? categoria.nombre : 'Categoría no encontrada';
  }

  protected obtenerNombreEjercicio(idEjercicio: number): string {
    const ejercicio = this.ejercicios().find((item) => item.id === idEjercicio);
    return ejercicio ? ejercicio.nombre : 'Ejercicio no encontrado';
  }

  protected onImageError(event: any): void {
    event.target.src = 'https://placehold.co/200x150?text=Imagen+no+disponible';
  }
}
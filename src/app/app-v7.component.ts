import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DatosFitnessService } from './services/datos-fitness.service';
import { Categoria } from './models/categoria';
import { Ejercicio } from './models/ejercicio';
import { Rutina } from './models/rutina';

interface RutinaFavoritaItem {
  id: number;
  idEjercicio: number;
  fecha: string;
  completada: boolean;
}

@Component({
  standalone: true,
  selector: 'app-v7',
  imports: [CommonModule, FormsModule],
  template: `
    <main class="page">
      <section class="hero">
        <p class="eyebrow">Versión 7</p>
        <h1>{{ title() }}</h1>
        <p class="intro">Todas tus rutinas en un lugar: Mis rutinas, Favoritas y Diarias desde Supabase.</p>
      </section>

      <section class="planner" aria-labelledby="planner-title">
        <header class="planner-header">
          <div>
            <h2 id="planner-title">Fitness Manager</h2>
            <p class="subtext">Gestiona tus entrenamientos desde la nube.</p>
          </div>
          <div class="summary">
            <span>{{ rutinas().length }}</span> rutinas •
            <span>{{ ejercicios().length }}</span> ejercicios •
            <span>{{ categorias().length }}</span> categorías
          </div>
        </header>

        <section class="section-block" *ngIf="!cargando() && !error()">
          <div class="section-heading">
            <div>
              <p class="eyebrow">Multimedia</p>
              <h3>Galería de ejercicios</h3>
            </div>
            <p class="section-description">Selecciona categoría para ver ejercicios con imagen, descripción y video en una sola página.</p>
          </div>

          <div class="categorias-grid">
            <button
              type="button"
              *ngFor="let categoria of categorias()"
              class="categoria-card"
              [class.active]="categoriaSeleccionadaV4() === categoria.id"
              (click)="categoriaSeleccionadaV4.set(categoria.id)">
              <span class="categoria-icon">{{ obtenerCategoriaEmoji(categoria.id) }}</span>
              <strong>{{ categoria.nombre }}</strong>
            </button>
          </div>

          <div class="ejercicios-grid">
            <article
              *ngFor="let ejercicio of ejerciciosFiltradosGaleria()"
              class="ejercicio-card"
              [class.selected]="ejercicioSeleccionadoV4() === ejercicio.id"
              (click)="ejercicioSeleccionadoV4.set(ejercicio.id)">
              <div class="ejercicio-imagen">
                <img
                  [src]="ejercicio.imagenUrl || placeholderImage(ejercicio.nombre)"
                  [alt]="ejercicio.nombre"
                  (error)="onImageError($event, ejercicio.nombre)" />
              </div>
              <div class="ejercicio-content">
                <h4>{{ ejercicio.nombre }}</h4>
                <p>{{ ejercicio.descripcion || 'Ejercicio disponible en tu plan.' }}</p>
                <span class="video-flag" *ngIf="ejercicio.videoUrl">🎥 Video disponible</span>
              </div>
            </article>
          </div>

          <div class="exercise-preview" *ngIf="ejercicioSeleccionadoGaleria() as ejercicio">
            <div class="preview-card">
              <div class="preview-image">
                <img
                  [src]="ejercicio.imagenUrl || placeholderImage(ejercicio.nombre)"
                  [alt]="ejercicio.nombre"
                  (error)="onImageError($event, ejercicio.nombre)" />
              </div>
              <div class="preview-details">
                <span class="eyebrow">Ejercicio seleccionado</span>
                <h3>{{ ejercicio.nombre }}</h3>
                <p>{{ ejercicio.descripcion || 'Descripción no disponible.' }}</p>
                <div class="preview-meta">
                  <span>Categoría: {{ obtenerNombreCategoriaV3(ejercicio.idCategoria) }}</span>
                  <span *ngIf="ejercicio.videoUrl">Video listo para ver</span>
                  <span *ngIf="!ejercicio.videoUrl">Sin video disponible</span>
                </div>
              </div>
            </div>
          </div>

          <div class="video-section" *ngIf="ejercicioSeleccionadoVideoUrl()">
            <h3>Video explicativo</h3>
            <div class="video-container">
              <iframe
                [src]="ejercicioSeleccionadoVideoUrl()"
                title="Video explicativo de ejercicio"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
              </iframe>
            </div>
          </div>
        </section>

        <section class="section-block" *ngIf="!cargando() && !error()">
          <div class="section-heading">
            <div>
              <p class="eyebrow">Mis rutinas</p>
              <h3>Gestiona tus entrenamientos</h3>
            </div>
            <p class="section-description">Añade nuevas rutinas con categoría, ejercicio y duración en un listado claro.</p>
          </div>

          <form class="workout-form" (ngSubmit)="addRutinaV3()">
            <label class="field">
              <span class="label-text">Categoría</span>
              <select [ngModel]="categoriaSeleccionadaV3()" (ngModelChange)="categoriaSeleccionadaV3.set($event)" name="categoriaV3">
                <option *ngFor="let cat of categorias()" [ngValue]="cat.id">{{ cat.nombre }}</option>
              </select>
            </label>

            <label class="field">
              <span class="label-text">Ejercicio</span>
              <select [ngModel]="ejercicioSeleccionadoV3()" (ngModelChange)="ejercicioSeleccionadoV3.set($event)" name="ejercicioV3">
                <option *ngFor="let ej of ejerciciosFiltradosV3()" [ngValue]="ej.id">{{ ej.nombre }}</option>
              </select>
            </label>

            <label class="field">
              <span class="label-text">Duración</span>
              <input type="text" [ngModel]="duracionNuevaV3()" (ngModelChange)="duracionNuevaV3.set($event)" name="duracionV3" placeholder="Ej: 30 min" />
            </label>

            <button type="submit" [disabled]="!duracionNuevaV3().trim()">Añadir rutina</button>
          </form>

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
              <button type="button" class="delete-btn" (click)="eliminarRutinaV3(rutina.id)" title="Eliminar">×</button>
            </li>
          </ul>
        </section>

        <section class="section-block" *ngIf="!cargando() && !error()">
          <div class="section-heading">
            <div>
              <p class="eyebrow">Favoritas</p>
              <h3>Rutinas favoritas</h3>
            </div>
            <p class="section-description">Guarda tus ejercicios preferidos con vista previa de la imagen.</p>
          </div>

          <div class="selector-grid">
            <div class="selector-card">
              <label class="field">
                <span class="label-text">Categoría</span>
                <select [ngModel]="categoriaSeleccionadaV5a()" (ngModelChange)="categoriaSeleccionadaV5a.set($event)" name="categoria">
                  <option *ngFor="let cat of categorias()" [ngValue]="cat.id">{{ cat.nombre }}</option>
                </select>
              </label>
              <label class="field">
                <span class="label-text">Ejercicio</span>
                <select [ngModel]="ejercicioSeleccionadoV5a()" (ngModelChange)="ejercicioSeleccionadoV5a.set($event)" name="ejercicio">
                  <option *ngFor="let ej of ejerciciosFiltradosV5a()" [ngValue]="ej.id">{{ ej.nombre }}</option>
                </select>
              </label>
              <button type="button" (click)="addToRutinasFavoritas()" [disabled]="!ejercicioSeleccionadoV5a()">Agregar a favoritas</button>
            </div>

            <div class="preview-card" *ngIf="ejercicioSeleccionadoPreviewV5a() as ejercicio">
              <div class="imagen-preview">
                <img
                  [src]="ejercicio.imagenUrl || placeholderImage(ejercicio.nombre)"
                  [alt]="ejercicio.nombre"
                  (error)="onImageError($event, ejercicio.nombre)" />
              </div>
              <div class="preview-content">
                <h3>{{ ejercicio.nombre }}</h3>
                <p>{{ ejercicio.descripcion || 'Ejercicio favorito seleccionado.' }}</p>
              </div>
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
                <button type="button" class="delete-btn" (click)="eliminarRutinaFavoritaItem(item.id)" title="Eliminar">×</button>
              </li>
            </ul>
          </div>
        </section>

        <section class="section-block" *ngIf="!cargando() && !error()">
          <div class="section-heading">
            <div>
              <p class="eyebrow">Diarias</p>
              <h3>Rutinas del día</h3>
            </div>
            <p class="section-description">Gestiona el flujo diario con progreso visual y un listado ordenado.</p>
          </div>

          <div class="goals-card">
            <h3>Meta diaria</h3>
            <p>Completa al menos <strong>3 rutinas</strong> para cerrar el día.</p>
            <div class="progress-bar">
              <div class="progress-fill" [style.width]="progressPercentV5b() + '%'" />
            </div>
          </div>

          <form class="workout-form" (ngSubmit)="addRutinaV5b()">
            <label class="field">
              <span class="label-text">Ejercicio</span>
              <select [ngModel]="ejercicioSeleccionadoV5b()" (ngModelChange)="ejercicioSeleccionadoV5b.set($event)" name="ejercicio">
                <option *ngFor="let ej of ejercicios()" [ngValue]="ej.id">{{ ej.nombre }}</option>
              </select>
            </label>
            <label class="field">
              <span class="label-text">Duración</span>
              <input type="text" [ngModel]="duracionNuevaV5b()" (ngModelChange)="duracionNuevaV5b.set($event)" name="duracion" placeholder="Ej: 20 min" />
            </label>
            <button type="submit" [disabled]="!duracionNuevaV5b().trim()">Añadir rutina</button>
          </form>

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
                <button type="button" class="delete-btn" (click)="eliminarRutinaV5b(rutina.id)" title="Eliminar">×</button>
              </li>
            </ul>
          </div>
        </section>
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
      max-width: 60rem;
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

    .section-block {
      margin-top: 2rem;
      padding-top: 1px;
      border-top: 1px solid #e5e7eb;
    }

    .section-heading {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 1rem;
      align-items: flex-start;
      margin-bottom: 1.5rem;
    }

    .section-heading h3 {
      margin: 0;
      font-size: 1.35rem;
      color: #111827;
    }

    .section-description {
      margin: 0;
      color: #475569;
      max-width: 40rem;
      line-height: 1.6;
    }

    .categorias-grid,
    .ejercicios-grid {
      display: grid;
      gap: 1rem;
    }

    .categorias-grid {
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      margin-bottom: 1.5rem;
    }

    .categoria-card {
      display: grid;
      gap: 0.5rem;
      justify-items: center;
      padding: 1rem;
      border-radius: 1rem;
      border: 1px solid #e5e7eb;
      background: #f8fafc;
      color: #111827;
      cursor: pointer;
      transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
    }

    .categoria-card:hover {
      transform: translateY(-1px);
      border-color: #93c5fd;
      background: #eff6ff;
    }

    .categoria-card.active {
      border-color: #2563eb;
      background: #dbeafe;
    }

    .categoria-icon {
      font-size: 1.75rem;
      display: block;
    }

    .ejercicios-grid {
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      margin-bottom: 1.5rem;
    }

    .ejercicio-card {
      display: grid;
      grid-template-rows: auto 1fr;
      background: #f8fafc;
      border-radius: 1rem;
      overflow: hidden;
      border: 1px solid #e5e7eb;
      transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
      cursor: pointer;
    }

    .ejercicio-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 24px rgba(15, 23, 42, 0.08);
    }

    .ejercicio-card.selected {
      border-color: #2563eb;
      box-shadow: 0 12px 24px rgba(37, 99, 235, 0.12);
    }

    .ejercicio-imagen {
      min-height: 180px;
      overflow: hidden;
      background: #e5e7eb;
    }

    .ejercicio-imagen img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .ejercicio-content {
      padding: 1rem;
      display: grid;
      gap: 0.75rem;
    }

    .ejercicio-content h4 {
      margin: 0;
      font-size: 1rem;
      color: #111827;
    }

    .ejercicio-content p {
      margin: 0;
      color: #475569;
      line-height: 1.5;
      min-height: 3rem;
    }

    .video-flag {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      padding: 0.45rem 0.75rem;
      border-radius: 999px;
      background: #e0f2fe;
      color: #0c4a6e;
      font-size: 0.85rem;
      font-weight: 700;
      width: fit-content;
    }

    .exercise-preview {
      margin-bottom: 1.5rem;
    }

    .preview-card {
      display: grid;
      gap: 1rem;
      padding: 1.5rem;
      border-radius: 1.25rem;
      background: #f8fafc;
      border: 1px solid #e5e7eb;
    }

    .preview-image {
      overflow: hidden;
      border-radius: 1rem;
      min-height: 240px;
      background: #e5e7eb;
    }

    .preview-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .preview-details h3 {
      margin: 0;
      font-size: 1.3rem;
      color: #111827;
    }

    .preview-details p {
      margin: 0;
      color: #475569;
      line-height: 1.75;
    }

    .preview-meta {
      display: grid;
      gap: 0.45rem;
      margin-top: 0.75rem;
      color: #6b7280;
      font-size: 0.95rem;
    }

    .video-section {
      margin-top: 1rem;
      padding: 1.5rem;
      border-radius: 1.25rem;
      background: #f8fafc;
      border: 1px solid #e5e7eb;
    }

    .video-section h3 {
      margin: 0 0 1rem;
      font-size: 1.2rem;
      color: #111827;
    }

    .video-container {
      position: relative;
      aspect-ratio: 16 / 9;
      min-height: 250px;
      overflow: hidden;
      border-radius: 1rem;
      background: #000;
    }

    .video-container iframe {
      width: 100%;
      height: 100%;
      border: 0;
      display: block;
    }

    /* FORM STYLES */
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

    .delete-btn {
      background: #ef4444;
      padding: 0.5rem 1rem;
      font-size: 1.2rem;
      line-height: 1;
    }

    .delete-btn:hover:not(:disabled) {
      background: #dc2626;
    }

    /* LISTS */
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
      padding: 1rem;
      border-radius: 1rem;
      background: #f8fafc;
      border: 1px solid #e5e7eb;
      transition: all 0.3s ease;
    }

    .workout-item:hover {
      background: #f1f5f9;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
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
      padding: 0;
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

    .info strong {
      display: block;
      margin-bottom: 0.25rem;
    }

    .info span {
      color: #6b7280;
      font-size: 0.9rem;
    }

    /* V5A SPECIFIC */
    .selector-grid {
      display: grid;
      grid-template-columns: 1fr 1.2fr;
      gap: 2rem;
      margin-bottom: 2rem;
      align-items: start;
    }

    .selector-card {
      background: #f8fafc;
      border-radius: 1rem;
      padding: 1.5rem;
      border: 1px solid #e5e7eb;
    }

    .preview-card {
      background: white;
      border-radius: 1rem;
      padding: 1.5rem;
      border: 2px solid #e5e7eb;
      overflow: hidden;
    }

    .imagen-preview {
      height: 200px;
      margin-bottom: 1rem;
      border-radius: 0.75rem;
      overflow: hidden;
    }

    .imagen-preview img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .preview-content h3 {
      margin: 1rem 0 0.5rem;
      font-size: 1.25rem;
    }

    .preview-content p {
      margin: 0;
      color: #6b7280;
      line-height: 1.6;
    }

    .playlist-section {
      margin-top: 2rem;
    }

    .playlist-list {
      list-style: none;
      margin: 1rem 0 0;
      padding: 0;
      display: grid;
      gap: 1rem;
    }

    .playlist-item {
      display: grid;
      grid-template-columns: auto 1fr auto;
      gap: 1rem;
      align-items: center;
      padding: 1.25rem;
      background: #f8fafc;
      border-radius: 1rem;
      border: 1px solid #e5e7eb;
    }

    .playlist-item.completed {
      opacity: 0.7;
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

    /* V5B SPECIFIC */
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
      background: linear-gradient(90deg, #2563eb 0%, #1d4ed8 100%);
      border-radius: 999px;
      transition: width 0.3s ease;
    }

    .rutinas-list {
      margin-top: 2rem;
    }

    .rutinas-list h3 {
      margin-bottom: 1rem;
      font-size: 1.1rem;
      color: #111827;
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
      grid-template-columns: auto 1fr auto;
      gap: 1rem;
      align-items: center;
      padding: 1.25rem;
      background: #f8fafc;
      border-radius: 1rem;
      border: 1px solid #e5e7eb;
      transition: all 0.3s ease;
    }

    .rutinas-list li:hover {
      background: #f1f5f9;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }

    .rutinas-list li.completed {
      opacity: 0.7;
    }

    .rutina-info {
      display: grid;
      line-height: 1.4;
      gap: 0.25rem;
    }

    .rutina-info strong {
      display: block;
    }

    .rutina-info span {
      color: #6b7280;
      font-size: 0.9rem;
      display: block;
    }

    @media (max-width: 640px) {
      .selector-grid {
        grid-template-columns: 1fr;
      }

      .workout-item,
      .playlist-item,
      .rutinas-list li {
        grid-template-columns: auto 1fr;
      }

      .delete-btn {
        grid-column: 2;
        justify-self: end;
      }
    }
  `]
})
export class AppV7 implements OnInit {
  private datosFitnessService = inject(DatosFitnessService);
  private readonly sanitizer = inject(DomSanitizer);

  protected readonly title = signal('Fitness Manager v7');
  protected readonly categorias = signal<Categoria[]>([]);
  protected readonly ejercicios = signal<Ejercicio[]>([]);
  protected readonly rutinas = signal<Rutina[]>([]);
  protected readonly cargando = signal(false);
  protected readonly error = signal('');

  protected readonly categoriaSeleccionadaV4 = signal(1);
  protected readonly ejercicioSeleccionadoV4 = signal(1);

  // V3
  protected readonly rutinasV3 = signal<Rutina[]>([]);
  protected readonly categoriaSeleccionadaV3 = signal(1);
  protected readonly ejercicioSeleccionadoV3 = signal(1);
  protected readonly duracionNuevaV3 = signal('30 min');

  // V5A
  protected readonly rutinasFavoritas = signal<RutinaFavoritaItem[]>([]);
  protected readonly categoriaSeleccionadaV5a = signal(1);
  protected readonly ejercicioSeleccionadoV5a = signal(1);

  // V5B
  protected readonly rutinasV5b = signal<Array<{ id: number; idEjercicio: number; duracion: string; completada: boolean; fecha: string }>>([]);
  protected readonly ejercicioSeleccionadoV5b = signal(1);
  protected readonly duracionNuevaV5b = signal('20 min');

  // Computed
  protected readonly ejerciciosFiltradosV3 = computed(() =>
    this.ejercicios().filter((ej) => ej.idCategoria === this.categoriaSeleccionadaV3())
  );

  protected readonly ejerciciosFiltradosV5a = computed(() =>
    this.ejercicios().filter((ej) => ej.idCategoria === this.categoriaSeleccionadaV5a())
  );

  protected readonly ejercicioSeleccionadoPreviewV5a = computed(() =>
    this.ejercicios().find((ej) => ej.id === this.ejercicioSeleccionadoV5a())
  );

  protected readonly ejerciciosFiltradosGaleria = computed(() =>
    this.ejercicios().filter((ej) => ej.idCategoria === this.categoriaSeleccionadaV4())
  );

  protected readonly ejercicioSeleccionadoGaleria = computed(() =>
    this.ejercicios().find((ej) => ej.id === this.ejercicioSeleccionadoV4())
  );

  protected readonly ejercicioSeleccionadoVideoUrl = computed<SafeResourceUrl | undefined>(() => {
    const ejercicio = this.ejercicioSeleccionadoGaleria();
    const videoUrl = (ejercicio as any)?.videoUrl;
    return videoUrl ? this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl) : undefined;
  });

  protected readonly completedCountV3 = computed(() =>
    this.rutinasV3().filter((r) => r.completada).length
  );

  protected readonly completedCountV5a = computed(() =>
    this.rutinasFavoritas().filter((r) => r.completada).length
  );

  protected readonly completedCountV5b = computed(() =>
    this.rutinasV5b().filter((r) => r.completada).length
  );

  protected readonly progressPercentV5b = computed(() =>
    Math.min(100, (this.completedCountV5b() / 3) * 100)
  );

  async ngOnInit(): Promise<void> {
    await this.cargarDatos();
  }

  private async cargarDatos(): Promise<void> {
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

      if (categorias.length > 0) {
        this.categoriaSeleccionadaV3.set(categorias[0].id);
        this.categoriaSeleccionadaV5a.set(categorias[0].id);
        this.categoriaSeleccionadaV4.set(categorias[0].id);
      }
      if (ejercicios.length > 0) {
        this.ejercicioSeleccionadoV3.set(ejercicios[0].id);
        this.ejercicioSeleccionadoV5a.set(ejercicios[0].id);
        this.ejercicioSeleccionadoV5b.set(ejercicios[0].id);
        this.ejercicioSeleccionadoV4.set(ejercicios[0].id);
      }
    } catch (err) {
      console.error(err);
      this.error.set('No se han podido cargar los datos desde Supabase.');
    } finally {
      this.cargando.set(false);
    }
  }

  // V3 METHODS
  protected addRutinaV3(): void {
    const duracion = this.duracionNuevaV3().trim();
    if (!duracion) return;

    const nuevaRutina: Omit<Rutina, 'id'> = {
      duracion,
      completada: false,
      favorita: false,
      diaria: false,
      idCategoria: this.categoriaSeleccionadaV3(),
      idEjercicio: this.ejercicioSeleccionadoV3()
    };

    this.datosFitnessService.crearRutina(nuevaRutina).then((rutina) => {
      this.rutinasV3.update((items) => [...items, rutina]);
      this.duracionNuevaV3.set('30 min');
    }).catch((err) => {
      console.error('Error al crear rutina:', err);
      this.error.set('Error al guardar rutina en Supabase');
    });
  }

  protected toggleRutinaV3(id: number): void {
    const rutina = this.rutinasV3().find((r) => r.id === id);
    if (!rutina) return;

    const updated = { ...rutina, completada: !rutina.completada };
    this.datosFitnessService.actualizarRutina(id, { completada: updated.completada }).then(() => {
      this.rutinasV3.update((items) =>
        items.map((item) =>
          item.id === id ? updated : item
        )
      );
    }).catch((err) => {
      console.error('Error al actualizar rutina:', err);
      this.error.set('Error al actualizar rutina en Supabase');
    });
  }

  protected eliminarRutinaV3(id: number): void {
    this.datosFitnessService.eliminarRutina(id).then(() => {
      this.rutinasV3.update((items) => items.filter((item) => item.id !== id));
    }).catch((err) => {
      console.error('Error al eliminar rutina:', err);
      this.error.set('Error al eliminar rutina de Supabase');
    });
  }

  protected obtenerNombreCategoriaV3(idCategoria: number): string {
    return this.categorias().find((cat) => cat.id === idCategoria)?.nombre ?? 'Desconocida';
  }

  protected obtenerNombreEjercicioV3(idEjercicio: number): string {
    return this.ejercicios().find((ej) => ej.id === idEjercicio)?.nombre ?? 'Desconocido';
  }

  protected obtenerCategoriaEmoji(idCategoria: number): string {
    switch (idCategoria) {
      case 1:
        return '💪';
      case 2:
        return '🧘';
      case 3:
        return '🏃';
      case 4:
        return '⚡';
      default:
        return '🏋️';
    }
  }

  protected placeholderImage(nombre: string): string {
    return `https://placehold.co/400x280?text=${encodeURIComponent(nombre)}`;
  }

  protected onImageError(event: any, nombre: string): void {
    event.target.src = this.placeholderImage(nombre);
  }

  // V5A METHODS
  protected addToRutinasFavoritas(): void {
    const selectedId = this.ejercicioSeleccionadoV5a();
    const exists = this.rutinasFavoritas().some((item) => item.idEjercicio === selectedId);
    if (exists) return;

    const nuevaRutina: Omit<Rutina, 'id'> = {
      duracion: '---',
      completada: false,
      favorita: true,
      diaria: false,
      idCategoria: this.categoriaSeleccionadaV5a(),
      idEjercicio: selectedId
    };

    this.datosFitnessService.crearRutina(nuevaRutina).then((rutina) => {
      const fecha = rutina.created_at ? String(rutina.created_at) : new Date().toISOString();
      this.rutinasFavoritas.update((items) => [
        ...items,
        {
          id: rutina.id,
          idEjercicio: rutina.idEjercicio,
          fecha,
          completada: rutina.completada
        }
      ]);
      this.rutinas.update((items) => [...items, rutina]);
    }).catch((err) => {
      console.error('Error al agregar favorita:', err);
      this.error.set('Error al guardar en Supabase');
    });
  }

  protected toggleRutinaFavoritaItem(id: number): void {
    const item = this.rutinasFavoritas().find((r) => r.id === id);
    if (!item) return;

    this.datosFitnessService.actualizarRutina(id, { completada: !item.completada }).then(() => {
      this.rutinasFavoritas.update((items) =>
        items.map((i) =>
          i.id === id ? { ...i, completada: !i.completada } : i
        )
      );
    }).catch((err) => {
      console.error('Error al actualizar favorita:', err);
      this.error.set('Error al actualizar en Supabase');
    });
  }

  protected eliminarRutinaFavoritaItem(id: number): void {
    this.datosFitnessService.eliminarRutina(id).then(() => {
      this.rutinasFavoritas.update((items) => items.filter((item) => item.id !== id));
    }).catch((err) => {
      console.error('Error al eliminar favorita:', err);
      this.error.set('Error al eliminar de Supabase');
    });
  }

  protected obtenerNombreEjercicioV5a(idEjercicio: number): string {
    return this.ejercicios().find((ej) => ej.id === idEjercicio)?.nombre ?? 'Desconocido';
  }

  // V5B METHODS
  protected addRutinaV5b(): void {
    const duracion = this.duracionNuevaV5b().trim();
    if (!duracion) return;

    const nuevaRutina: Omit<Rutina, 'id'> = {
      idEjercicio: this.ejercicioSeleccionadoV5b(),
      duracion,
      completada: false,
      favorita: false,
      diaria: true,
      idCategoria: 1
    };

    this.datosFitnessService.crearRutina(nuevaRutina).then((rutina) => {
      const fecha = rutina.created_at ? String(rutina.created_at) : new Date().toISOString();
      this.rutinasV5b.update((items) => [
        ...items,
        {
          id: rutina.id,
          idEjercicio: rutina.idEjercicio,
          duracion: rutina.duracion,
          completada: rutina.completada,
          fecha
        }
      ]);
      this.rutinas.update((items) => [...items, rutina]);
      this.duracionNuevaV5b.set('20 min');
    }).catch((err) => {
      console.error('Error al crear rutina diaria:', err);
      this.error.set('Error al guardar en Supabase');
    });
  }

  protected toggleRutinaV5b(id: number): void {
    const rutina = this.rutinasV5b().find((r) => r.id === id);
    if (!rutina) return;

    this.datosFitnessService.actualizarRutina(id, { completada: !rutina.completada }).then((updatedRutina) => {
      this.rutinasV5b.update((items) =>
        items.map((item) =>
          item.id === id ? { ...item, completada: !item.completada } : item
        )
      );
      this.rutinas.update((items) =>
        items.map((item) =>
          item.id === id ? { ...item, completada: updatedRutina.completada } : item
        )
      );
    }).catch((err) => {
      console.error('Error al actualizar rutina diaria:', err);
      this.error.set('Error al actualizar en Supabase');
    });
  }

  protected eliminarRutinaV5b(id: number): void {
    this.datosFitnessService.eliminarRutina(id).then(() => {
      this.rutinasV5b.update((items) => items.filter((item) => item.id !== id));
      this.rutinas.update((items) => items.filter((rutina) => rutina.id !== id));
    }).catch((err) => {
      console.error('Error al eliminar rutina diaria:', err);
      this.error.set('Error al eliminar de Supabase');
    });
  }

  protected obtenerNombreEjercicioV5b(idEjercicio: number): string {
    return this.ejercicios().find((ej) => ej.id === idEjercicio)?.nombre ?? 'Desconocido';
  }
}

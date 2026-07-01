import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

interface Ejercicio {
  id: number;
  nombre: string;
  idCategoria: number;
  descripcion: string;
  imagenUrl: string;
}

@Component({
  standalone: true,
  selector: 'v5b-exercise-detail',
  imports: [CommonModule],
  template: `
    <section class="exercise-detail" *ngIf="ejercicio() as e; else none">
      <div class="exercise-image">
        <img [src]="e.imagenUrl" [alt]="e.nombre" />
      </div>
      <div class="exercise-meta">
        <h3>{{ e.nombre }}</h3>
        <p>{{ e.descripcion }}</p>
      </div>
    </section>
    <ng-template #none>
      <p class="sin-seleccion">Selecciona un ejercicio para ver el detalle.</p>
    </ng-template>
  `,
  styles: [
    `
      .exercise-detail {
        display: grid;
        grid-template-columns: 160px 1fr;
        gap: 1rem;
        background: #f8fafc;
        padding: 1rem;
        border-radius: 0.75rem;
        border: 1px solid #e5e7eb;
        margin-bottom: 1rem;
      }
      .exercise-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 0.5rem;
      }
      .sin-seleccion {
        color: #6b7280;
        margin: 0.5rem 0 1rem;
      }
    `
  ]
})
export class V5bExerciseDetail {
  ejercicio = input<Ejercicio | null>(null);
}

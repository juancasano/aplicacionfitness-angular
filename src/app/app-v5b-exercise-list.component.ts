import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

interface Ejercicio {
  id: number;
  nombre: string;
  idCategoria: number;
  descripcion: string;
  imagenUrl: string;
}

@Component({
  standalone: true,
  selector: 'v5b-exercise-list',
  imports: [CommonModule],
  template: `
    <section class="exercise-list">
      <h3>Lista de ejercicios</h3>
      <ul>
        <li *ngFor="let e of ejercicios()" class="exercise-item">
          <button type="button" class="select" (click)="seleccionarEjercicio(e)">
            {{ e.nombre }}
          </button>
        </li>
      </ul>
    </section>
  `,
  styles: [
    `
      .exercise-list {
        margin-bottom: 1rem;
      }
      .exercise-item {
        list-style: none;
        margin: 0.35rem 0;
      }
      .select {
        width: 100%;
        text-align: left;
        padding: 0.6rem 0.8rem;
        border-radius: 0.6rem;
        border: 1px solid #e5e7eb;
        background: white;
        cursor: pointer;
      }
    `
  ]
})
export class V5bExerciseList {
  ejercicios = input<Ejercicio[]>([]);
  seleccionar = output<Ejercicio>();

  seleccionarEjercicio(e: Ejercicio): void {
    this.seleccionar.emit(e);
  }
}

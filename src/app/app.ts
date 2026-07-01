import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { DatosFitnessService, Categoria, Ejercicio, Rutina } from './services/datos-fitness.service';

export type Workout = {
  id: number;
  name: string;
  duration: string;
  completed: boolean;
};

@Component({
  standalone: true,
  selector: 'app-v1',
  imports: [NgFor, NgIf],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppV1 implements OnInit {
  private readonly datosFitnessService = inject(DatosFitnessService);

  protected readonly title = signal('Aplicación Fitness v7 - Datos desde Supabase');

  // Signals para datos del servicio (inicialmente vacías)
  protected readonly categorias = signal<Categoria[]>([]);
  protected readonly ejercicios = signal<Ejercicio[]>([]);
  protected readonly rutinas = signal<Rutina[]>([]);

  // Signals para estado de carga
  protected readonly cargando = signal(false);
  protected readonly error = signal('');

  // Signals para workouts locales
  protected readonly workouts = signal<Workout[]>([]);
  protected readonly newWorkout = signal('');

  protected readonly completedCount = computed(
    () => this.workouts().filter((item) => item.completed).length
  );

  ngOnInit(): void {
    this.cargarDatos();
  }

  async cargarDatos(): Promise<void> {
    this.cargando.set(true);
    this.error.set('');

    try {
      const [categorias, ejercicios, rutinas] = await Promise.all([
        this.datosFitnessService.obtenerCategorias(),
        this.datosFitnessService.obtenerEjercicios(),
        this.datosFitnessService.obtenerRutinas()
      ]);

      this.categorias.set(categorias);
      this.ejercicios.set(ejercicios);
      this.rutinas.set(rutinas);

      // Inicializar workouts con las rutinas obtenidas
      this.workouts.set(
        rutinas.map(r => ({
          id: r.id,
          name: r.nombre,
          duration: `${r.duracion_minutos} min`,
          completed: false
        }))
      );
    } catch (err) {
      console.error('Error cargando datos:', err);
      this.error.set('No se pudieron cargar los datos desde Supabase. Verifica tu conexión y configuración.');
    } finally {
      this.cargando.set(false);
    }
  }

  protected addWorkout(): void {
    const name = this.newWorkout().trim();
    if (!name) {
      return;
    }

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

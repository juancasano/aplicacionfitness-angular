import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface VersionCard {
  path: string;
  label: string;
  title: string;
  summary: string;
  final?: boolean;
}

@Component({
  standalone: true,
  selector: 'app-inicio',
  imports: [CommonModule, RouterLink],
  templateUrl: './inicio.html',
  styleUrls: ['./inicio.css']
})
export class InicioComponent {
  readonly versions: VersionCard[] = [
    {
      path: '/v1',
      label: 'v1',
      title: 'Lista básica',
      summary: 'Rutinas en memoria: añadir y marcar como completadas.'
    },
    {
      path: '/v2',
      label: 'v2',
      title: 'Planificador',
      summary: 'UI de planificador más clara para organizar sesiones.'
    },
    {
      path: '/v3',
      label: 'v3',
      title: 'Modelo relacional',
      summary: 'Separación de categorías, ejercicios y rutinas.'
    },
    {
      path: '/v4',
      label: 'v4',
      title: 'Multimedia',
      summary: 'Galería visual de categorías y componentes más ricos.'
    },
    {
      path: '/v5a',
      label: 'v5a',
      title: 'Favoritos',
      summary: 'Gestión de rutinas favoritas y progreso.'
    },
    {
      path: '/v5b',
      label: 'v5b',
      title: 'Desafío diario',
      summary: 'Metas diarias y estado visual del entrenamiento.'
    },
    {
      path: '/v6',
      label: 'v6',
      title: 'Plan semanal',
      summary: 'Organización por días y seguimiento semanal.'
    },
    {
      path: '/v7',
      label: 'v7',
      title: 'Datos remotos',
      summary: 'HttpClient + Supabase (categorías, ejercicios, rutinas).'
    },
    {
      path: '/v8',
      label: 'v8',
      title: 'Formularios reactivos',
      summary: 'CRUD de rutinas con Reactive Forms y Supabase.'
    },
    {
      path: '/rutinas',
      label: 'v9',
      title: 'App final',
      summary: 'Rutinas, favoritas, diarias y plan semanal — filtro, edición y borrado.',
      final: true
    }
  ];
}

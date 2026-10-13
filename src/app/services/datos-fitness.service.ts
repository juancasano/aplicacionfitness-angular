import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { Categoria } from '../models/categoria';
import { Ejercicio } from '../models/ejercicio';
import { Rutina } from '../models/rutina';
import {
  isSupabaseConfigured,
  SUPABASE_ANON_KEY,
  SUPABASE_URL
} from '../config/supabase.config';

@Injectable({
  providedIn: 'root'
})
export class DatosFitnessService {
  private http = inject(HttpClient);
  private readonly useRemote = isSupabaseConfigured();
  /** true = demo local sin Supabase / sin BD real */
  readonly usandoDatosLocales = !this.useRemote;
  private baseUrl = `${SUPABASE_URL}/rest/v1`;

  private headers = new HttpHeaders({
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`
  });

  private readonly representationHeaders = this.headers.set('Prefer', 'return=representation');

  /** Estado local cuando Supabase no está configurado. */
  private mockCategorias: Categoria[] = [
    { id: 1, nombre: 'Fuerza' },
    { id: 2, nombre: 'Cardio' },
    { id: 3, nombre: 'Movilidad' },
    { id: 4, nombre: 'Core' }
  ];

  private mockEjercicios: Ejercicio[] = [
    // Fuerza
    { id: 1, nombre: 'Sentadilla', idCategoria: 1, descripcion: 'Piernas y glúteos' },
    { id: 2, nombre: 'Press banca', idCategoria: 1, descripcion: 'Pecho' },
    { id: 3, nombre: 'Peso muerto', idCategoria: 1, descripcion: 'Cadena posterior' },
    { id: 4, nombre: 'Dominadas', idCategoria: 1, descripcion: 'Espalda y biceps' },
    { id: 5, nombre: 'Press militar', idCategoria: 1, descripcion: 'Hombros' },
    { id: 6, nombre: 'Remo con barra', idCategoria: 1, descripcion: 'Espalda' },
    { id: 7, nombre: 'Zancadas', idCategoria: 1, descripcion: 'Piernas unilaterales' },
    { id: 8, nombre: 'Fondos en paralelas', idCategoria: 1, descripcion: 'Tríceps y pecho' },
    // Cardio
    { id: 9, nombre: 'Carrera continua', idCategoria: 2, descripcion: 'Resistencia' },
    { id: 10, nombre: 'Bicicleta', idCategoria: 2, descripcion: 'Cardio de bajo impacto' },
    { id: 11, nombre: 'Saltar cuerda', idCategoria: 2, descripcion: 'Coordinación y cardio' },
    { id: 12, nombre: 'HIIT', idCategoria: 2, descripcion: 'Intervalos de alta intensidad' },
    { id: 13, nombre: 'Remo máquina', idCategoria: 2, descripcion: 'Full body cardio' },
    { id: 14, nombre: 'Elíptica', idCategoria: 2, descripcion: 'Cardio articulado' },
    // Movilidad
    { id: 15, nombre: 'Estiramientos generales', idCategoria: 3, descripcion: 'Flexibilidad global' },
    { id: 16, nombre: 'Yoga flow', idCategoria: 3, descripcion: 'Movilidad y respiración' },
    { id: 17, nombre: 'Movilidad de cadera', idCategoria: 3, descripcion: 'Apertura de cadera' },
    { id: 18, nombre: 'Foam roller', idCategoria: 3, descripcion: 'Liberación miofascial' },
    { id: 19, nombre: 'Movilidad de hombro', idCategoria: 3, descripcion: 'Rango articular' },
    { id: 20, nombre: 'Movilidad torácica', idCategoria: 3, descripcion: 'Columna y postura' },
    // Core
    { id: 21, nombre: 'Plancha', idCategoria: 4, descripcion: 'Estabilidad abdominal' },
    { id: 22, nombre: 'Crunch', idCategoria: 4, descripcion: 'Recto abdominal' },
    { id: 23, nombre: 'Elevación de piernas', idCategoria: 4, descripcion: 'Core inferior' },
    { id: 24, nombre: 'Russian twist', idCategoria: 4, descripcion: 'Oblicuos' },
    { id: 25, nombre: 'Bird dog', idCategoria: 4, descripcion: 'Core y estabilidad' }
  ];

  private mockRutinas: Rutina[] = [
    { id: 1, duracion: '45 min', completada: false, idCategoria: 1, idEjercicio: 1, favorita: true },
    { id: 2, duracion: '30 min', completada: true, idCategoria: 2, idEjercicio: 9, diaria: true },
    { id: 3, duracion: '20 min', completada: false, idCategoria: 3, idEjercicio: 15 },
    { id: 4, duracion: '15 min', completada: false, idCategoria: 4, idEjercicio: 21, favorita: true },
    { id: 5, duracion: '40 min', completada: false, idCategoria: 1, idEjercicio: 3 }
  ];

  private nextRutinaId = 6;

  async obtenerCategorias(): Promise<Categoria[]> {
    if (!this.useRemote) {
      return structuredClone(this.mockCategorias);
    }
    try {
      const url = `${this.baseUrl}/categorias?select=*&order=id.asc`;
      return await firstValueFrom(this.http.get<Categoria[]>(url, { headers: this.headers }));
    } catch {
      return structuredClone(this.mockCategorias);
    }
  }

  async obtenerEjercicios(): Promise<Ejercicio[]> {
    if (!this.useRemote) {
      return structuredClone(this.mockEjercicios);
    }
    try {
      const url = `${this.baseUrl}/ejercicios?select=*&order=id.asc`;
      return await firstValueFrom(this.http.get<Ejercicio[]>(url, { headers: this.headers }));
    } catch {
      return structuredClone(this.mockEjercicios);
    }
  }

  async obtenerRutinas(): Promise<Rutina[]> {
    if (!this.useRemote) {
      return structuredClone(this.mockRutinas);
    }
    try {
      const url = `${this.baseUrl}/rutinas?select=*&order=id.asc`;
      return await firstValueFrom(this.http.get<Rutina[]>(url, { headers: this.headers }));
    } catch {
      return structuredClone(this.mockRutinas);
    }
  }

  async crearRutina(rutina: Omit<Rutina, 'id'>): Promise<Rutina> {
    if (!this.useRemote) {
      const creada: Rutina = { id: this.nextRutinaId++, ...rutina };
      this.mockRutinas = [...this.mockRutinas, creada];
      return structuredClone(creada);
    }
    try {
      const url = `${this.baseUrl}/rutinas`;
      const response = await firstValueFrom(
        this.http.post<Rutina[]>(url, rutina, { headers: this.representationHeaders })
      );
      if (!response || response.length === 0) {
        throw new Error('Supabase no devolvió datos al crear rutina');
      }
      return response[0];
    } catch {
      const creada: Rutina = { id: this.nextRutinaId++, ...rutina };
      this.mockRutinas = [...this.mockRutinas, creada];
      return structuredClone(creada);
    }
  }

  async actualizarRutina(id: number, rutina: Partial<Rutina>): Promise<Rutina> {
    if (!this.useRemote) {
      const idx = this.mockRutinas.findIndex((r) => r.id === id);
      if (idx === -1) {
        throw new Error(`Rutina ${id} no encontrada (mock)`);
      }
      this.mockRutinas[idx] = { ...this.mockRutinas[idx], ...rutina };
      return structuredClone(this.mockRutinas[idx]);
    }
    try {
      const url = `${this.baseUrl}/rutinas?id=eq.${id}`;
      const response = await firstValueFrom(
        this.http.patch<Rutina[]>(url, rutina, { headers: this.representationHeaders })
      );
      if (!response || response.length === 0) {
        throw new Error('Supabase no devolvió datos al actualizar rutina');
      }
      return response[0];
    } catch {
      const idx = this.mockRutinas.findIndex((r) => r.id === id);
      if (idx === -1) {
        throw new Error(`Rutina ${id} no encontrada tras fallo remoto`);
      }
      this.mockRutinas[idx] = { ...this.mockRutinas[idx], ...rutina };
      return structuredClone(this.mockRutinas[idx]);
    }
  }

  async eliminarRutina(id: number): Promise<void> {
    if (!this.useRemote) {
      this.mockRutinas = this.mockRutinas.filter((r) => r.id !== id);
      return;
    }
    try {
      const url = `${this.baseUrl}/rutinas?id=eq.${id}`;
      await firstValueFrom(this.http.delete(url, { headers: this.headers }));
    } catch {
      this.mockRutinas = this.mockRutinas.filter((r) => r.id !== id);
    }
  }
}

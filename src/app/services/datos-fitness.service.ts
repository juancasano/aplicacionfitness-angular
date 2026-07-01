import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { SUPABASE_ANON_KEY, SUPABASE_URL } from '../config/supabase.config';

export interface Categoria {
  id: number;
  nombre: string;
}

export interface Ejercicio {
  id: number;
  nombre: string;
  descripcion: string;
  id_categoria: number;
}

export interface Rutina {
  id: number;
  nombre: string;
  descripcion: string;
  duracion_minutos: number;
}

export interface WorkoutEjercicio {
  id: number;
  id_rutina: number;
  id_ejercicio: number;
  series: number;
  repeticiones: number;
}

@Injectable({
  providedIn: 'root'
})
export class DatosFitnessService {
  private http = inject(HttpClient);
  private baseUrl = `${SUPABASE_URL}/rest/v1`;

  private headers = new HttpHeaders({
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`
  });

  // Obtener categorías desde Supabase
  async obtenerCategorias(): Promise<Categoria[]> {
    const url = `${this.baseUrl}/categorias?select=*&order=id.asc`;
    return await firstValueFrom(
      this.http.get<Categoria[]>(url, { headers: this.headers })
    );
  }

  // Obtener ejercicios desde Supabase
  async obtenerEjercicios(): Promise<Ejercicio[]> {
    const url = `${this.baseUrl}/ejercicios?select=*&order=id.asc`;
    return await firstValueFrom(
      this.http.get<Ejercicio[]>(url, { headers: this.headers })
    );
  }

  // Obtener rutinas desde Supabase
  async obtenerRutinas(): Promise<Rutina[]> {
    const url = `${this.baseUrl}/rutinas?select=*&order=id.asc`;
    return await firstValueFrom(
      this.http.get<Rutina[]>(url, { headers: this.headers })
    );
  }

  // Obtener workout ejercicios desde Supabase
  async obtenerWorkoutEjercicios(): Promise<WorkoutEjercicio[]> {
    const url = `${this.baseUrl}/workout_ejercicios?select=*&order=id.asc`;
    return await firstValueFrom(
      this.http.get<WorkoutEjercicio[]>(url, { headers: this.headers })
    );
  }
}

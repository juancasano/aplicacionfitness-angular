import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { Categoria } from '../models/categoria';
import { Ejercicio } from '../models/ejercicio';
import { Rutina } from '../models/rutina';
import { SUPABASE_ANON_KEY, SUPABASE_URL } from '../config/supabase.config';

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

  async obtenerCategorias(): Promise<Categoria[]> {
    const url = `${this.baseUrl}/categorias?select=*&order=id.asc`;
    return await firstValueFrom(this.http.get<Categoria[]>(url, { headers: this.headers }));
  }

  async obtenerEjercicios(): Promise<Ejercicio[]> {
    const url = `${this.baseUrl}/ejercicios?select=*&order=id.asc`;
    return await firstValueFrom(this.http.get<Ejercicio[]>(url, { headers: this.headers }));
  }

  async obtenerRutinas(): Promise<Rutina[]> {
    const url = `${this.baseUrl}/rutinas?select=*&order=id.asc`;
    return await firstValueFrom(this.http.get<Rutina[]>(url, { headers: this.headers }));
  }
}

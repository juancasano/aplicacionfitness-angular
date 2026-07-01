import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { Marca } from '../models/marca';
import { Modelo } from '../models/modelo';
import { Coche } from '../models/coche';
import { SUPABASE_ANON_KEY, SUPABASE_URL } from '../config/supabase.config';

@Injectable({
  providedIn: 'root'
})
export class DatosCochesService {
  private http = inject(HttpClient);
  private baseUrl = `${SUPABASE_URL}/rest/v1`;

  private headers = new HttpHeaders({
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`
  });

  async obtenerMarcas(): Promise<Marca[]> {
    const url = `${this.baseUrl}/marcas?select=*&order=id.asc`;
    return await firstValueFrom(this.http.get<Marca[]>(url, { headers: this.headers }));
  }

  async obtenerModelos(): Promise<Modelo[]> {
    const url = `${this.baseUrl}/modelos?select=*&order=id.asc`;
    return await firstValueFrom(this.http.get<Modelo[]>(url, { headers: this.headers }));
  }

  async obtenerCoches(): Promise<Coche[]> {
    const url = `${this.baseUrl}/coches?select=*&order=id.asc`;
    return await firstValueFrom(this.http.get<Coche[]>(url, { headers: this.headers }));
  }
}

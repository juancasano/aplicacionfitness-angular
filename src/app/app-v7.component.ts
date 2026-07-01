import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { DatosCochesService } from './services/datos-coches.service';
import { Marca } from './models/marca';
import { Modelo } from './models/modelo';
import { Coche } from './models/coche';

@Component({
  standalone: true,
  selector: 'app-v7',
  imports: [CommonModule],
  template: `
    <main class="page">
      <section class="hero">
        <p class="eyebrow">Versión 7</p>
        <h1>{{ title() }}</h1>
        <p class="intro">Coches reales desde Supabase usando HttpClient y tablas REST.</p>
      </section>

      <section class="planner" aria-labelledby="planner-title">
        <header class="planner-header">
          <div>
            <h2 id="planner-title">Coches desde Supabase</h2>
            <p class="subtext">Carga marcas, modelos y coches desde la nube.</p>
          </div>
          <div class="summary">
            <span>{{ coches().length }}</span> coches •
            <span>{{ marcas().length }}</span> marcas •
            <span>{{ modelos().length }}</span> modelos
          </div>
        </header>

        <div class="status-messages">
          <div class="loading-message" *ngIf="cargando()">
            Cargando datos desde Supabase...
          </div>
          <div class="error-message" *ngIf="error()">
            {{ error() }}
          </div>
        </div>

        <div class="data-grid" *ngIf="!cargando() && !error()">
          <section class="data-card">
            <h3>Marcas</h3>
            <ul>
              <li *ngFor="let marca of marcas()">{{ marca.id }} - {{ marca.nombre }}</li>
            </ul>
          </section>

          <section class="data-card">
            <h3>Modelos</h3>
            <ul>
              <li *ngFor="let modelo of modelos()">
                {{ modelo.id }} - {{ modelo.nombre }} (marca: {{ obtenerNombreMarca(modelo.idMarca) }})
              </li>
            </ul>
          </section>

          <section class="data-card">
            <h3>Coches</h3>
            <ul>
              <li *ngFor="let coche of coches()">
                {{ coche.id }} - {{ coche.matricula }} ({{ coche.color }}) -
                {{ obtenerNombreMarca(coche.idMarca) }} / {{ obtenerNombreModelo(coche.idModelo) }}
              </li>
            </ul>
          </section>
        </div>
      </section>
    </main>
  `,
  styles: [
    `
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

      .status-messages {
        display: grid;
        gap: 1rem;
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

      .data-grid {
        display: grid;
        gap: 1rem;
      }

      .data-card {
        background: #f8fafc;
        border-radius: 1rem;
        padding: 1.25rem;
        border: 1px solid #e2e8f0;
      }

      .data-card h3 {
        margin-top: 0;
      }

      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: 0.75rem;
      }

      li {
        padding: 0.85rem 1rem;
        border-radius: 0.85rem;
        background: white;
        border: 1px solid #e5e7eb;
      }
    `
  ]
})
export class AppV7 implements OnInit {
  private datosCochesService = inject(DatosCochesService);

  protected readonly title = signal('Coches desde Supabase');
  protected readonly marcas = signal<Marca[]>([]);
  protected readonly modelos = signal<Modelo[]>([]);
  protected readonly coches = signal<Coche[]>([]);
  protected readonly cargando = signal(false);
  protected readonly error = signal('');

  async ngOnInit(): Promise<void> {
    await this.cargarDatos();
  }

  private async cargarDatos(): Promise<void> {
    this.cargando.set(true);
    this.error.set('');

    try {
      const marcas = await this.datosCochesService.obtenerMarcas();
      const modelos = await this.datosCochesService.obtenerModelos();
      const coches = await this.datosCochesService.obtenerCoches();
      this.marcas.set(marcas);
      this.modelos.set(modelos);
      this.coches.set(coches);
    } catch (err) {
      console.error(err);
      this.error.set('No se han podido cargar los datos desde Supabase.');
    } finally {
      this.cargando.set(false);
    }
  }

  protected obtenerNombreMarca(idMarca: number): string {
    return this.marcas().find((marca) => marca.id === idMarca)?.nombre ?? 'Desconocida';
  }

  protected obtenerNombreModelo(idModelo: number): string {
    return this.modelos().find((modelo) => modelo.id === idModelo)?.nombre ?? 'Desconocido';
  }
}

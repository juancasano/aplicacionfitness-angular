import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <header class="app-bar">
      <a routerLink="/v4" routerLinkActive="active">Multimedia Fitness</a>
      <a routerLink="/v5a" routerLinkActive="active">Rutinas Favoritas</a>
      <a routerLink="/v5b" routerLinkActive="active">Desafío Diario</a>
      <a routerLink="/v6" routerLinkActive="active">Control Semanal</a>
    </header>
    <main class="app-content">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [
    `
      .app-bar {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        padding: 1rem;
        background: rgba(15, 23, 42, 0.05);
        border-radius: 1rem;
        margin-bottom: 1.5rem;
      }
      .app-bar a {
        color: #1d4ed8;
        text-decoration: none;
        padding: 0.75rem 1rem;
        border-radius: 0.85rem;
        transition: background 0.2s ease;
      }
      .app-bar a:hover,
      .app-bar a.active {
        background: #e0f2fe;
      }
      .app-content {
        min-height: 70vh;
      }
    `
  ]
})
export class AppRoot {}
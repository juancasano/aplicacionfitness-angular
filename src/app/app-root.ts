import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
@Component({
  standalone: true,
  selector: 'app-root',
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <nav class="app-bar">
      <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Inicio</a>
      <a routerLink="/rutinas" routerLinkActive="active">Gestión de rutinas</a>
      <a routerLink="/v1" routerLinkActive="active">v1</a>
      <a routerLink="/v2" routerLinkActive="active">v2</a>
      <a routerLink="/v3" routerLinkActive="active">v3</a>
      <a routerLink="/v4" routerLinkActive="active">v4</a>
      <a routerLink="/v5a" routerLinkActive="active">v5a</a>
      <a routerLink="/v5b" routerLinkActive="active">v5b</a>
      <a routerLink="/v6" routerLinkActive="active">v6</a>
      <a routerLink="/v7" routerLinkActive="active">v7</a>
      <a routerLink="/v8" routerLinkActive="active">v8</a>
      <a routerLink="/v9" routerLinkActive="active">v9</a>
    </nav>
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

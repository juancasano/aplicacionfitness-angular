import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <nav class="app-bar" aria-label="Navegación principal">
      <div class="nav-primary">
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Inicio</a>
        <a routerLink="/rutinas" routerLinkActive="active">App final (v9)</a>
      </div>

      <div class="nav-versions">
        <button
          type="button"
          class="versions-toggle"
          [attr.aria-expanded]="versionsOpen()"
          (click)="versionsOpen.set(!versionsOpen())"
        >
          Versiones históricas
          <span aria-hidden="true">{{ versionsOpen() ? '▴' : '▾' }}</span>
        </button>

        @if (versionsOpen()) {
          <div class="versions-menu" role="group" aria-label="Versiones v1 a v9">
            <a routerLink="/v1" routerLinkActive="active" (click)="closeVersions()">v1</a>
            <a routerLink="/v2" routerLinkActive="active" (click)="closeVersions()">v2</a>
            <a routerLink="/v3" routerLinkActive="active" (click)="closeVersions()">v3</a>
            <a routerLink="/v4" routerLinkActive="active" (click)="closeVersions()">v4</a>
            <a routerLink="/v5a" routerLinkActive="active" (click)="closeVersions()">v5a</a>
            <a routerLink="/v5b" routerLinkActive="active" (click)="closeVersions()">v5b</a>
            <a routerLink="/v6" routerLinkActive="active" (click)="closeVersions()">v6</a>
            <a routerLink="/v7" routerLinkActive="active" (click)="closeVersions()">v7</a>
            <a routerLink="/v8" routerLinkActive="active" (click)="closeVersions()">v8</a>
            <a routerLink="/v9" routerLinkActive="active" (click)="closeVersions()">v9</a>
          </div>
        }
      </div>
    </nav>

    <main class="app-content">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [
    `
      .app-bar {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 1rem;
        padding: 0.85rem 1rem;
        background: rgba(15, 23, 42, 0.04);
        border: 1px solid #e2e8f0;
        border-radius: 1rem;
        margin-bottom: 1.5rem;
      }
      .nav-primary {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
      .nav-primary a,
      .versions-menu a {
        color: #1d4ed8;
        text-decoration: none;
        padding: 0.55rem 0.9rem;
        border-radius: 0.85rem;
        font-weight: 600;
        transition: background 0.2s ease;
      }
      .nav-primary a:hover,
      .nav-primary a.active,
      .versions-menu a:hover,
      .versions-menu a.active {
        background: #e0f2fe;
      }
      .nav-versions {
        position: relative;
        margin-left: auto;
      }
      .versions-toggle {
        border: 1px solid #cbd5e1;
        background: #fff;
        color: #0f172a;
        font: inherit;
        font-weight: 600;
        padding: 0.55rem 0.9rem;
        border-radius: 0.85rem;
        cursor: pointer;
      }
      .versions-toggle:hover {
        background: #f8fafc;
      }
      .versions-menu {
        display: flex;
        flex-wrap: wrap;
        gap: 0.35rem;
        margin-top: 0.55rem;
        padding: 0.55rem;
        background: #fff;
        border: 1px solid #e2e8f0;
        border-radius: 0.85rem;
        box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
      }
      .app-content {
        min-height: 70vh;
      }
      @media (max-width: 640px) {
        .nav-versions {
          margin-left: 0;
          width: 100%;
        }
        .versions-toggle {
          width: 100%;
        }
      }
    `
  ]
})
export class AppRoot {
  readonly versionsOpen = signal(false);

  closeVersions(): void {
    this.versionsOpen.set(false);
  }
}

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <header class="shell-header">
      <a routerLink="/" class="brand" aria-label="Fitness Manager — inicio">
        <span class="brand-mark" aria-hidden="true"></span>
        <span class="brand-text">
          <strong>Fitness Manager</strong>
          <small>Angular · v1→v9</small>
        </span>
      </a>

      <nav class="app-bar" aria-label="Navegación principal">
        <div class="nav-primary">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Inicio</a>
          <a routerLink="/rutinas" routerLinkActive="active" class="nav-cta">App final</a>
        </div>

        <div class="nav-versions">
          <button
            type="button"
            class="versions-toggle"
            [attr.aria-expanded]="versionsOpen()"
            (click)="versionsOpen.set(!versionsOpen())"
          >
            Versiones
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
    </header>

    <main class="app-content">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [
    `
      .shell-header {
        display: grid;
        gap: 1rem;
        margin-bottom: 1.75rem;
        animation: rise-in 0.55s ease both;
      }

      .brand {
        display: inline-flex;
        align-items: center;
        gap: 0.85rem;
        text-decoration: none;
        color: var(--ink);
        width: fit-content;
      }

      .brand-mark {
        width: 2.6rem;
        height: 2.6rem;
        border-radius: 12px;
        background:
          linear-gradient(145deg, var(--accent) 0%, #9fd82a 100%);
        box-shadow: inset 0 -6px 12px rgba(16, 36, 28, 0.12);
        position: relative;
      }

      .brand-mark::after {
        content: '';
        position: absolute;
        inset: 22% 28% 28% 28%;
        border: 2.5px solid var(--accent-ink);
        border-radius: 4px;
        border-top: none;
        transform: rotate(-8deg);
      }

      .brand-text {
        display: grid;
        gap: 0.1rem;
      }

      .brand-text strong {
        font-family: var(--font-display);
        font-size: 1.2rem;
        letter-spacing: -0.03em;
      }

      .brand-text small {
        color: var(--muted);
        font-size: 0.8rem;
        font-weight: 600;
      }

      .app-bar {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.75rem;
        padding: 0.55rem;
        background: rgba(251, 253, 251, 0.78);
        border: 1px solid var(--line);
        border-radius: var(--radius);
        backdrop-filter: blur(8px);
      }

      .nav-primary {
        display: flex;
        flex-wrap: wrap;
        gap: 0.35rem;
      }

      .nav-primary a,
      .versions-menu a {
        color: var(--ink-soft);
        text-decoration: none;
        padding: 0.55rem 0.9rem;
        border-radius: var(--radius-sm);
        font-weight: 600;
        transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
      }

      .nav-primary a:hover,
      .versions-menu a:hover {
        background: var(--surface-2);
        color: var(--ink);
      }

      .nav-primary a.active,
      .versions-menu a.active {
        background: var(--ink);
        color: var(--accent);
      }

      .nav-cta:not(.active) {
        background: var(--accent);
        color: var(--accent-ink);
      }

      .nav-cta:not(.active):hover {
        background: #d8f85a;
        transform: translateY(-1px);
      }

      .nav-versions {
        position: relative;
        margin-left: auto;
      }

      .versions-toggle {
        border: 1px solid var(--line);
        background: var(--paper);
        color: var(--ink);
        font: inherit;
        font-weight: 600;
        padding: 0.55rem 0.9rem;
        border-radius: var(--radius-sm);
        cursor: pointer;
        transition: border-color 0.2s ease, background 0.2s ease;
      }

      .versions-toggle:hover,
      .versions-toggle[aria-expanded='true'] {
        border-color: var(--accent-deep);
        background: #fff;
      }

      .versions-menu {
        display: flex;
        flex-wrap: wrap;
        gap: 0.3rem;
        margin-top: 0.5rem;
        padding: 0.5rem;
        background: var(--paper);
        border: 1px solid var(--line);
        border-radius: var(--radius-sm);
        box-shadow: var(--shadow);
        animation: rise-in 0.25s ease both;
      }

      .app-content {
        min-height: 70vh;
        animation: rise-in 0.65s ease 0.05s both;
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

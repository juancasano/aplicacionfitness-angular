import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <header class="app-bar">
      <nav class="tabs" role="tablist" aria-label="Versiones de la app">
        <a role="tab" class="tab" routerLink="" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Versión 1</a>
        <a role="tab" class="tab" routerLink="v2" routerLinkActive="active">Versión 2</a>
        <a role="tab" class="tab" routerLink="v3" routerLinkActive="active">Versión 3</a>
        <a role="tab" class="tab" routerLink="v4" routerLinkActive="active">Versión 4</a>
        <a role="tab" class="tab" routerLink="v5a" routerLinkActive="active">Versión 5A</a>
        <a role="tab" class="tab" routerLink="v5b" routerLinkActive="active">Versión 5B</a>
      </nav>
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
      .tabs {
        display: flex;
        gap: 0.5rem;
        align-items: center;
        width: 100%;
        flex-wrap: wrap;
      }
      .tab {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.6rem 0.9rem;
        border-radius: 0.7rem;
        background: transparent;
        color: #1d4ed8;
        text-decoration: none;
        border: 1px solid transparent;
      }
      .tab:hover {
        background: rgba(37, 99, 235, 0.06);
      }
      .tab.active {
        background: #e0f2fe;
        border-color: rgba(37, 99, 235, 0.12);
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
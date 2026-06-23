import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-v2',
  template: `
    <div class="v2-page">
      <h1>Ejercicio 2 - Versión v2</h1>
      <p class="navigation">
        <a href="https://www.lavanguardia.com/" target="_blank" rel="noreferrer">La Vanguardia</a>
        <a href="https://www.streetfighter.com/6/es-es/character/gouki_akuma" target="_blank" rel="noreferrer">Personaje Akuma</a>
      </p>

      <section class="v2-cards">
        <article class="v2-card card-purple">
          <h2>Ejercicio 2</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <a routerLink="/" class="button">Volver a la versión 1</a>
        </article>

        <article class="v2-card card-green">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </article>

        <article class="v2-card card-teal">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </article>
      </section>
    </div>
  `,
  styles: [
    `
      .v2-page {
        display: grid;
        gap: 1.25rem;
        padding: 1.5rem;
      }
      .navigation {
        display: flex;
        gap: 1rem;
      }
      .navigation a {
        display: inline-block;
        padding: 0.55rem 1rem;
        border-radius: 0.85rem;
        background: #111827;
        color: white;
        text-decoration: none;
      }
      .v2-cards {
        display: grid;
        gap: 1rem;
      }
      .v2-card {
        border-radius: 1.25rem;
        padding: 1.5rem;
        box-shadow: 0 18px 45px rgba(15, 23, 42, 0.08);
        color: white;
      }
      .card-purple {
        background: linear-gradient(135deg, #7c3aed 0%, #c084fc 100%);
      }
      .card-green {
        background: linear-gradient(135deg, #16a34a 0%, #22c55e 100%);
      }
      .card-teal {
        background: linear-gradient(135deg, #0f766e 0%, #2dd4bf 100%);
      }
      .button {
        display: inline-block;
        margin-top: 1rem;
        padding: 0.75rem 1.25rem;
        border-radius: 0.85rem;
        background: rgba(255, 255, 255, 0.14);
        color: white;
        text-decoration: none;
      }
    `
  ]
})
export class AppV2 {}

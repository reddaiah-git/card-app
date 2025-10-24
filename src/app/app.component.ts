import { Component } from '@angular/core';
import { CardListComponent } from './components/card-list/card-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CardListComponent],
  template: `
    <div class="container">
      <h1>Dynamic Card Manager</h1>
      <app-card-list></app-card-list>
    </div>
  `,
  styles: [
    `
      .container {
        display: flex;
        color: #333;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        background-color: #D9EAFD;
        height: 100vh;
        max-width: 11000px;

        padding: 40px;
        margin: auto;
      }
      @media (max-width: 600px) {
        .container {
          padding: 10px;
          height: auto;
        }
      }
      h1 {
        margin-bottom: 50px;
        color: #1B3C53;
        font-weight: bold;
        font-size: 40px;
      }
      @media (max-width: 600px) {
        h1 {
          font-size: 28px;
          margin-bottom: 30px;
        }
      }
    `,
  ],
})
export class AppComponent {}

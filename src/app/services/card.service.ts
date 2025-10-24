import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Card } from '../models/card.model';

@Injectable({ providedIn: 'root' })
export class CardService {
  private readonly LOCAL_STORAGE_KEY = 'cards_app_cards';
  private jsonUrl = 'assets/cards.json';
  private cards$ = new BehaviorSubject<Card[]>([]);

  constructor(private http: HttpClient) {
    this.loadCards();
  }

  private loadCards() {
    const storedCards = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    if (storedCards) {
      this.cards$.next(JSON.parse(storedCards));
    } else {
      this.http
        .get<Card[]>(this.jsonUrl)
        .pipe(
          catchError(() => of([])),
          tap((cards) => {
            this.cards$.next(cards);
            this.saveCardsToLocalStorage();
          })
        )
        .subscribe();
    }
  }

  private saveCardsToLocalStorage() {
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(this.cards$.value));
  }

  getCards() {
    return this.cards$.asObservable();
  }

  updateCard(updated: Card) {
    const cards = this.cards$.value.map((c) => (c.id === updated.id ? updated : c));
    this.cards$.next(cards);
    this.saveCardsToLocalStorage();
  }

  addCard(title: string, description: string) {
    const newId = Math.max(...this.cards$.value.map((c) => c.id), 0) + 1;
    const newCard: Card = { id: newId, title, description };
    this.cards$.next([...this.cards$.value, newCard]);
    this.saveCardsToLocalStorage();
  }

  deleteCard(id: number) {
    this.cards$.next(this.cards$.value.filter((c) => c.id !== id));
    this.saveCardsToLocalStorage();
  }

  reloadFromJson() {
    // This will reload from the JSON and then save to local storage
    localStorage.removeItem(this.LOCAL_STORAGE_KEY); // Clear local storage to force reload from JSON
    this.loadCards();
  }
}

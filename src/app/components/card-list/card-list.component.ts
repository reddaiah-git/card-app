import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { CardService } from '../../services/card.service';
import { Card } from '../../models/card.model';
import { EditCardModalComponent } from '../edit-card-modal/edit-card-modal.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
  ],
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit {
  cards$!: Observable<Card[]>;
  title = new FormControl('', Validators.required);
  desc = new FormControl('', Validators.required);

  constructor(private svc: CardService, private dialog: MatDialog, private snack: MatSnackBar) {}

  ngOnInit() {
    this.cards$ = this.svc.getCards();
  }

  openEdit(card: Card) {
    const dialogRef = this.dialog.open(EditCardModalComponent, { width: '400px', data: card });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.svc.updateCard(result);
        this.snack.open('Card updated', 'OK', { duration: 1200 });
      }
    });
  }

  addCard() {
    if (this.title.invalid || this.desc.invalid) return;
    this.svc.addCard(this.title.value || '', this.desc.value || '');

    this.title.reset();
    this.desc.reset();
    this.snack.open('Card added', 'OK', { duration: 1000 });
  }

  deleteCard(id: number) {
    this.svc.deleteCard(id);
    this.snack.open('Card deleted', 'OK', { duration: 1000 });
  }
}

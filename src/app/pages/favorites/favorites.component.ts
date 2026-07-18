import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Favorite } from '../../interfaces/repository.interface';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  favorites: Favorite[] = [];
  isLoading: boolean = false;
  editingId: string | null = null;
  editForm!: FormGroup;

  constructor(
    private favoritesService: FavoritesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadFavorites();
    this.initForm();
  }

  initForm(): void {
    this.editForm = new FormGroup({
      tag: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      priority: new FormControl('media', [Validators.required])
    });
  }

  loadFavorites(): void {
    this.isLoading = true;
    this.cdr.detectChanges();

    this.favoritesService.getAll().subscribe({
      next: (data) => {
        this.favorites = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  startEdit(fav: Favorite): void {
    this.editingId = fav.id!;
    this.editForm.setValue({ tag: fav.tag, priority: fav.priority });
    this.cdr.detectChanges();
  }

  cancelEdit(): void {
    this.editingId = null;
    this.editForm.reset({ priority: 'media' });
    this.cdr.detectChanges();
  }

  saveEdit(fav: Favorite): void {
    if (this.editForm.invalid) return;

    const updated: Favorite = {
      ...fav,
      tag: this.editForm.value.tag,
      priority: this.editForm.value.priority
    };

    // Actualizar inmediatamente en la UI
    const idx = this.favorites.findIndex(f => f.id === fav.id);
    if (idx !== -1) {
      this.favorites = [...this.favorites];
      this.favorites[idx] = updated;
    }
    this.cancelEdit();

    this.favoritesService.update(fav.id!, updated).subscribe({
      next: (saved) => {
        const i = this.favorites.findIndex(f => f.id === fav.id);
        if (i !== -1) this.favorites[i] = saved;
        this.cdr.detectChanges();
      },
      error: () => {
        // Revertir si falla
        if (idx !== -1) this.favorites[idx] = fav;
        this.cdr.detectChanges();
        alert('Fallo al borrar el favorito');
      }
    });
  }

  remove(id: string): void {
    // Eliminar inmediatamente en la UI
    this.favorites = this.favorites.filter(f => f.id !== id);
    this.cdr.detectChanges();

    this.favoritesService.remove(id).subscribe({
      error: () => {
        // Revertir si falla recargando desde MockAPI
        this.loadFavorites();
        alert('Fallo al borrar el favorito');
      }
    });
  }

  priorityLabel(p: string): string {
    const map: Record<string, string> = { alta: 'ALTA', media: 'Media', baja: 'baja' };
    return map[p] || p;
  }
}

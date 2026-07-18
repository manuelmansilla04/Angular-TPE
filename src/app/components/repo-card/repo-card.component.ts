import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Repository } from '../../interfaces/repository.interface';

@Component({
  selector: 'app-repo-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './repo-card.component.html',
  styleUrls: ['./repo-card.component.scss']
})
export class RepoCardComponent {

  @Input() repo!: Repository;
  @Input() isFavorite: boolean = false;

  @Output() addFavorite = new EventEmitter<Repository>();
  @Output() removeFavorite = new EventEmitter<Repository>();

  onToggleFavorite(): void {
    if (this.isFavorite) {
      this.removeFavorite.emit(this.repo);
    } else {
      this.addFavorite.emit(this.repo);
    }
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('es-AR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }
}

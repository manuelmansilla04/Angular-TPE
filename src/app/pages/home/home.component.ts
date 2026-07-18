import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Repository, Favorite } from '../../interfaces/repository.interface';
import { GithubService } from '../../services/github.service';
import { FavoritesService } from '../../services/favorites.service';
import { RepoCardComponent } from '../../components/repo-card/repo-card.component';
import { RepoSearchComponent } from '../../components/repo-search/repo-search.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RepoCardComponent, RepoSearchComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  repos: Repository[] = [];
  favorites: Favorite[] = [];
  isLoading: boolean = false;
  errorMsg: string = '';
  searchedQuery: string = '';

  constructor(
    private githubService: GithubService,
    private favoritesService: FavoritesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.favoritesService.getAll().subscribe({
      next: (data) => {
        this.favorites = data;
        this.cdr.detectChanges();
      },
      error: () => {
        this.favorites = [];
        this.cdr.detectChanges();
      }
    });
  }

  onSearch(query: string): void {
    this.isLoading = true;
    this.errorMsg = '';
    this.searchedQuery = query;
    this.cdr.detectChanges();

    this.githubService.searchRepositories(query).subscribe({
      next: (response) => {
        this.repos = response.items;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMsg = 'Error al conectar con GitHub. Intenta de nuevo.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  isFavorite(repo: Repository): boolean {
    return this.favorites.some(f => f.repoId === repo.id);
  }

  onAddFavorite(repo: Repository): void {
    if (this.isFavorite(repo)) return;

    const newFav: Favorite = {
      repoId: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      description: repo.description,
      html_url: repo.html_url,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      language: repo.language,
      ownerLogin: repo.owner.login,
      ownerAvatar: repo.owner.avatar_url,
      tag: 'Sin etiqueta',
      priority: 'media'
    };

    this.favorites = [...this.favorites, newFav];
    this.cdr.detectChanges();

    this.favoritesService.add(newFav).subscribe({
      next: (saved) => {
        const idx = this.favorites.findIndex(f => f.repoId === repo.id);
        if (idx !== -1) {
          this.favorites = [...this.favorites];
          this.favorites[idx] = saved;
        }
        this.cdr.detectChanges();
      },
      error: () => {
        this.favorites = this.favorites.filter(f => f.repoId !== repo.id);
        this.cdr.detectChanges();
        alert('No se pudo guardar el favorito');
      }
    });
  }

  onRemoveFavorite(repo: Repository): void {
    const fav = this.favorites.find(f => f.repoId === repo.id);
    if (!fav || !fav.id) return;

    this.favorites = this.favorites.filter(f => f.repoId !== repo.id);
    this.cdr.detectChanges();

    this.favoritesService.remove(fav.id).subscribe({
      error: () => {
        this.favorites = [...this.favorites, fav];
        this.cdr.detectChanges();
        alert('No se pudo quitar el favorito');
      }
    });
  }
}

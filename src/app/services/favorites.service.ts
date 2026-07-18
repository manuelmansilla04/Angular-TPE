import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Favorite } from '../interfaces/repository.interface';

const MOCK_API_URL = 'https://6a52d4c478ecba6073e2e137.mockapi.io/favorites';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  constructor(private http: HttpClient) {}

  // GET - Obtener todos los favoritos
  getAll(): Observable<Favorite[]> {
    return this.http.get<Favorite[]>(MOCK_API_URL);
  }

  // POST - Agregar un favorito
  add(favorite: Favorite): Observable<Favorite> {
    return this.http.post<Favorite>(MOCK_API_URL, favorite);
  }

  // PUT - Editar etiqueta/prioridad de un favorito
  update(id: string, favorite: Favorite): Observable<Favorite> {
    return this.http.put<Favorite>(`${MOCK_API_URL}/${id}`, favorite);
  }

  // DELETE - Quitar un favorito
  remove(id: string): Observable<Favorite> {
    return this.http.delete<Favorite>(`${MOCK_API_URL}/${id}`);
  }
}

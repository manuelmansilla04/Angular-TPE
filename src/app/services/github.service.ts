import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Repository } from '../interfaces/repository.interface';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private readonly API_URL = 'https://api.github.com/search/repositories';

  constructor(private http: HttpClient) {}

  searchRepositories(query: string): Observable<{ items: Repository[] }> {
    const url = `${this.API_URL}?q=${query}&sort=stars&order=desc&per_page=12`;
    return this.http.get<{ items: Repository[] }>(url);
  }
}

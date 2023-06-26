import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LivroInterface } from '../types/livro.interface';

@Injectable()
export class LivroService {
  constructor(private http: HttpClient) { }

  getLivro(id: number): Observable<LivroInterface> {
    return this.http.get<LivroInterface>(`${environment.apiUrl}/livros/${id}`);
  }

  getLivros(): Observable<LivroInterface[]> {
    return this.http.get<LivroInterface[]>(`${environment.apiUrl}/livros`);
  }

  save(livro: LivroInterface): Observable<LivroInterface> {
    return this.http.post<LivroInterface>(`${environment.apiUrl}/livros`, livro);
  }


  update(livro: LivroInterface): Observable<LivroInterface> {
    return this.http.put<LivroInterface>(`${environment.apiUrl}/livros/${livro.id}`, livro);
  }

  remove({ id }: LivroInterface): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/livros/${id}`);
  }
}
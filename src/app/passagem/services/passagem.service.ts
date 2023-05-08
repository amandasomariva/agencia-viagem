import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PassagemInterface } from '../types/passagem.interface';

@Injectable()
export class PassagemService {
  constructor(private httpPassagem: HttpClient) { }

  getPassagem(id: number): Observable<PassagemInterface> {
    return this.httpPassagem.get<PassagemInterface>(
      `${environment.apiUrl}/passagens/${id}`
    )
  }

  getPassagens(): Observable<PassagemInterface[]> {
    return this.httpPassagem.get<PassagemInterface[]>(
      `${environment.apiUrl}/passagens`
    );
  }

  update(passagem: PassagemInterface): Observable<PassagemInterface> {
    return this.httpPassagem.put<PassagemInterface>(
      `${environment.apiUrl}/passagens/${passagem.id}`,
      passagem
    )
  }

  save(passagem: PassagemInterface): Observable<PassagemInterface> {
    return this.httpPassagem.post<PassagemInterface>(
      `${environment.apiUrl}/passagens`,
      passagem
    );
  }

  remove(passagem: PassagemInterface): Observable<void> {
    return this.httpPassagem.delete<void>(
      `${environment.apiUrl}/passagens/${passagem.id}`
    );
  }
}

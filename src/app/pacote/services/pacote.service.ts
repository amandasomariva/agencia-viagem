import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PacoteInterface } from '../types/pacote.interface';

@Injectable()
export class PacoteService {
  constructor(private httpClient: HttpClient) { }

  getPacote(id: number): Observable<PacoteInterface> {
    return this.httpClient.get<PacoteInterface>(
      `${environment.apiUrl}/pacotes/${id}`
    )
  }

  getPacotes(): Observable<PacoteInterface[]> {
    return this.httpClient.get<PacoteInterface[]>(
      `${environment.apiUrl}/pacotes`
    );
  }

  update(pacote: PacoteInterface): Observable<PacoteInterface> {
    return this.httpClient.put<PacoteInterface>(
      `${environment.apiUrl}/pacotes/${pacote.id}`,
      pacote
    )
  }

  save(pacote: PacoteInterface): Observable<PacoteInterface> {
    return this.httpClient.post<PacoteInterface>(
      `${environment.apiUrl}/pacotes`,
      pacote
    );
  }

  remove(pacote: PacoteInterface): Observable<void> {
    return this.httpClient.delete<void>(
      `${environment.apiUrl}/pacotes/${pacote.id}`
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdemServicoService {
  constructor(private httpClient: HttpClient) { }
  authService = inject(AuthService)
  URL = 'http://localhost:8080/ordem-servico'

  getOrdemServicoByUser(userId: string): Observable<any>{
    const headers = this.authService.getHeadersToken()
    return this.httpClient.get<any>(`${this.URL}/user/${userId}`, {headers})
  }
}

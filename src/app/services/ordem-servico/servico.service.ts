import { Injectable, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Servico } from '../../interfaces/servico';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicoService {

  constructor(private http: HttpClient) { }
  authService = inject(AuthService)
  
  URL = 'http://localhost:8080/servico'

  getServicos(): Observable<Servico[]> {
    const headers = this.authService.getHeadersToken()
    return this.http.get<Servico[]>(this.URL, {headers})
  }

}

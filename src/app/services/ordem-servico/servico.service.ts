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

  getServico(servicoId: String): Observable<Servico> {
    const headers = this.authService.getHeadersToken()
    return this.http.get<Servico>(`${this.URL}/${servicoId}`, {headers})
  }

  getServicos(): Observable<Servico[]> {
    const headers = this.authService.getHeadersToken()
    return this.http.get<Servico[]>(this.URL, {headers})
  }

  createServico(body: any): Observable<Servico>{
    const headers = this.authService.getHeadersToken()
    return this.http.post<Servico>(`${this.URL}`, body, {headers})
  }
  
  updateServico(servicoId: String, body: any): Observable<Servico>{
    const headers = this.authService.getHeadersToken()
    return this.http.put<Servico>(`${this.URL}/${servicoId}`, body, {headers})
  }

  deleteServico(servicoId: string){
    const headers = this.authService.getHeadersToken()
    return this.http.delete<Servico>(`${this.URL}/${servicoId}`, {headers})
  }

}

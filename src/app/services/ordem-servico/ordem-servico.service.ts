import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrdemServicoService {
  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private authService: AuthService){ }
  URL = 'http://localhost:8080/ordem-servico'

  //acho que não é usado
  /*
  getOrdemServicoByUser(userId: string): Observable<any>{
    const headers = this.authService.getHeadersToken()
    return this.httpClient.get<any>(`${this.URL}/user/${userId}`, {headers})
  }
  */

  //implementar verificacao de status
  /*
 getOrdemServico(ordemServicoId: any): Observable<any>{

 }
  */
 
  getOrdemServicoByUser(userId: any): Observable<any> {
    const token = localStorage.getItem('access-token');
    const headers = this.authService.getHeadersToken();
    
    return this.authService.getUserData(token).pipe(
      switchMap(res => {
        if (res.role === 'ADMIN') {
          return this.httpClient.get<any>(`${this.URL}`, {headers});
        } 
        return this.httpClient.get<any>(`${this.URL}/user/${userId}`, { headers });
      })
    );
  }

  getOrdemServicoItems(ordemServicoId: any): Observable<any>{ 
    const headers = this.authService.getHeadersToken()
    return this.httpClient.get<any>(`${this.URL}/item/${ordemServicoId}`, {headers})
  }

  updateSituacao(ordemServicoId: any, situacaoId: number) :Observable<any>{
    const headers = this.authService.getHeadersToken()
    const body = {
      situacaoId: situacaoId
    }
    return this.httpClient.post<any>(`${this.URL}/situacao/${ordemServicoId}`, body, {headers})
  }
}

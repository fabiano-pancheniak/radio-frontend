import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Servico } from '../interfaces/servico';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DeferirService {

  constructor(private http: HttpClient, private route: ActivatedRoute) { }
  baseURL = 'http://localhost:8080'
  authService = inject(AuthService)
  
  getOrdensServico(): Observable<any>{
    const headers = this.authService.getHeadersToken()
    return this.http.get<any>(`${this.baseURL}/ordem-servico`, {headers})
  }

}

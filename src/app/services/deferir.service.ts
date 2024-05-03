import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Servico } from '../interfaces/servico';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DeferirService {

  constructor(private http: HttpClient, private route: ActivatedRoute) { }
  baseURL = 'http://localhost:8080'

  getOrdensServico(): Observable<any>{
    return this.http.get<any>(`${this.baseURL}/ordem-servico`)
  }

  getOrdemServicoItems(): Observable<any>{ 
    const ordemServicoId = this.route.snapshot.paramMap.get('id');
    return this.http.get<any>(`${this.baseURL}/ordem-servico/item/${ordemServicoId}`)
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  constructor(private http: HttpClient) { }

  URL = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados'

  consultaCEP(cep: string): Observable<any>{
    const cepURL = `https://viacep.com.br/ws/${cep}/json/`
    return this.http.get<any>(cepURL)
  }

  getEstados(): Observable<any[]> {
    return this.http.get<any[]>(this.URL)
  }

}

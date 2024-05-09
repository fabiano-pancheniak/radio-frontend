import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Servico } from '../interfaces/servico';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApoioCulturalService {

  constructor(private http: HttpClient) { }
  authService = inject(AuthService)

  URL = 'http://localhost:8080/servico'

  getServicos(token: string): Observable<Servico[]> {
    const headers = this.authService.getHeadersToken()
    return this.http.get<Servico[]>(this.URL, {headers})
  }

  createOrdemServico(body: any, filesToUpload: any): Observable<any> {
    const formData = {
      userId: "5844c86f-4c62-4070-9389-314c46a97c19",
      ordemServicoItems: body
    }

    filesToUpload.forEach((item: any) => {
      this.uploadFile(item).subscribe()
    });
    
    return this.http.post<any>('http://localhost:8080/ordem-servico', formData)
  }

  uploadFile(file: any): Observable<any>{
    return this.http.post<any>('http://localhost:8080/storage/uploadFile', file)
  }
}

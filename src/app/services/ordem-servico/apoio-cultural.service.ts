import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Servico } from '../../interfaces/servico';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApoioCulturalService {

  constructor(private http: HttpClient) { 
    this.authService.getUserData(localStorage.getItem('access-token')).subscribe(res => this.userId = res.id)
  }
  authService = inject(AuthService)
  userId: string = ''

  createOrdemServico(body: any, filesToUpload: any): Observable<any> {
    const formData = {
      userId: this.userId,
      ordemServicoItems: body
    }
    const headers = this.authService.getHeadersToken()
    
    filesToUpload.forEach((item: any) => {
      this.uploadFile(item).subscribe()
    });
    
    return this.http.post<any>('http://localhost:8080/ordem-servico', formData, {headers})
  }

  uploadFile(file: any): Observable<any>{
    const headers = this.authService.getHeadersToken()
    return this.http.post<any>('http://localhost:8080/storage/uploadFile', file, {headers})
  }
}

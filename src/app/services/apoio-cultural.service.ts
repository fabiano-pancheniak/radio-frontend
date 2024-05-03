import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Servico } from '../interfaces/servico';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApoioCulturalService {

  constructor(private http: HttpClient) { }

  URL = 'http://localhost:8080/servico'

  getServicos(): Observable<Servico[]> {
    return this.http.get<Servico[]>(this.URL)
  }

  createOrdemServico(body: any, filesToUpload: any): Observable<any> {
    const formData = {
      userId: "3d140051-c99c-4154-b27c-70f36f6b4779",
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

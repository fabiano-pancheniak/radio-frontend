import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, throwError, Subject } from 'rxjs';
import { User } from '../interfaces/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  URL = 'http://localhost:8080/userinfo'

  authService = inject(AuthService)

  getUserId(token: string){
    return this.authService.parseJwt(token).sub
  }

  getUserInfo(userId: String): Observable<User>{
    const headers = this.authService.getHeadersToken()
    return this.http.get<User>(`${this.URL}/${userId}`, {headers})
  }

  updateUserInfo(body: any, userId: String): Observable<User>{
    const headers = this.authService.getHeadersToken()
    return this.http.patch<User>(`${this.URL}/${userId}`, body, {headers})
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unexpected error occurred';
    if (error.status === 404) {
      errorMessage = 'User not found (404)';
    }
    return throwError(() => new Error(errorMessage));
  }

}

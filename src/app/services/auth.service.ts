import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, firstValueFrom  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { 
  }

  URL = 'http://localhost:8080'

  register(body: any): Observable<any>{
    return this.http.post(`${this.URL}/auth/register`, body)
  }

  login(body: any): Observable<any>{
    return this.http.post(`${this.URL}/auth/login`, body)
  }

  parseJwt(token: any) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  isTokenExpired(token: any){
    if(token){
      this.parseJwt(token)
      if (Date.now() >= token.exp * 1000){
        return false;
      }
      return true;
    }
    return false
  }

  getUserData(token: any): Observable<any>{
    const userId = this.parseJwt(token).sub
    const headers = this.getHeadersToken()
    return this.http.get(`${this.URL}/user/${userId}`, {headers})
  }

  getHeadersToken(){
    const token = localStorage.getItem('access-token')
    const headers = {
      "Authorization": `Bearer ${token}`
    }
    return headers
  }

}

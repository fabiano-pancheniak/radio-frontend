import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  URL = 'http://localhost:8080/userinfo'
  USERID = '09abcfed-c17e-456c-9793-138ab970d680'

  getUserInfo(userId: String): Observable<User>{
    return this.http.get<User>(`${this.URL}/${userId}`)
  }

  updateUserInfo(body: any, userId: String): Observable<User>{
    return this.http.patch<User>(`${this.URL}/${userId}`, body)
  }

}

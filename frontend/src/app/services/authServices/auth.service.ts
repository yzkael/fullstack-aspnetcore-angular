import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../../common/authInterfaces/loginRequest';
import { Observable } from 'rxjs';
import { LoginResponse } from '../../common/authInterfaces/loginResponse';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient) { }
  private apiUrl = environment.apiUrl;

  loginRequest(data:LoginRequest):Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.apiUrl}/api/auth/login`,data);
  }
}

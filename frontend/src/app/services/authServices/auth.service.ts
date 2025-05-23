import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../../common/types/authInterfaces/loginRequest';
import { Observable } from 'rxjs';
import { LoginResponse } from '../../common/types/authInterfaces/loginResponse';
import { environment } from '../../../environments/environment';
import { RegisterRequest } from '../../common/types/authInterfaces/registerRequest';
import { RegisterResponse } from '../../common/types/authInterfaces/registerResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient) { }
  private apiUrl = environment.apiUrl;
  

  loginRequest(data:LoginRequest):Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.apiUrl}/api/auth/login`,data);
  }
  
  registerRequest(data:RegisterRequest):Observable<RegisterResponse>{
    return this.http.post<RegisterResponse>(`${this.apiUrl}/api/auth/register`,data);
  }

  logoutRequest(){
    localStorage.removeItem(environment.rolesLocalStorage);
    localStorage.removeItem(environment.tokenLocalStorage);
  }

}

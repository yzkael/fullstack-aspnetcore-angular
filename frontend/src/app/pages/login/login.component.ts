import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginRequest } from '../../common/authInterfaces/loginRequest';
import { AuthService } from '../../services/authServices/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
    
    authServices = inject(AuthService) 
    router = inject(Router)

    loginFormData: LoginRequest = {
      username: "",
      password: ""
    }

    loginForm:FormGroup = new FormGroup({
      username: new FormControl("",[Validators.required]),
      password: new FormControl("",[Validators.required])
    })

    ngOnInit(): void {
      this.loginForm.patchValue(this.loginFormData)
    }

    onSubmit(){
      console.log("Reached");
      if (this.loginForm.valid) {
        this.authServices.loginRequest(this.loginForm.value).subscribe({
          next: (response) => {
            // Debugger
            console.log(response);
            localStorage.setItem(environment.rolesLocalStorage, JSON.stringify(response.roles))
            localStorage.setItem(environment.tokenLocalStorage,response.token)
            this.router.navigateByUrl("/dashboard")
          },
          error: (err) => {
            alert("Something went wrong.")
            console.error('Login failed', err);
          }
        });
    }

  }
}

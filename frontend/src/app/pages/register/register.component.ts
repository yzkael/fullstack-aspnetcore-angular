import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/authServices/auth.service';
import { Router } from '@angular/router';
import { RegisterRequest } from '../../common/authInterfaces/registerRequest';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  authServices = inject(AuthService)
  router = inject(Router)


  ngOnInit(): void {
    this.registerForm.patchValue(this.registerFormData)
  }
  
  registerFormData: RegisterRequest = {
    username: "",
    password: "",
    confirmPassword:"",
    email: ""
  }

  registerForm:FormGroup = new FormGroup({
    username: new FormControl("",[Validators.required]),
    password: new FormControl("",[Validators.required]),
    confirmPassword: new FormControl("",[Validators.required]),
    email: new FormControl("",[Validators.required])
  })

  onSubmit(){
    if(this.registerForm.valid){
      this.authServices.registerRequest(this.registerForm.value).subscribe({
        next:(response)=>{},
        error:(err)=>{}
      })
    }
  }
}

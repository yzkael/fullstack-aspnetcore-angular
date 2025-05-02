import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../../services/authServices/auth.service';
import { Router } from '@angular/router';
import { RegisterRequest } from '../../common/authInterfaces/registerRequest';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  authServices = inject(AuthService)
  router = inject(Router)
  isSubmit = false;


  ngOnInit(): void {
    this.registerForm.patchValue(this.registerFormData)
  }
  
  registerFormData: RegisterRequest = {
    username: "",
    password: "",
    confirmPassword:"",
    email: ""
  }

  passwordMatch = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if (password === confirmPassword) {
      return null;
    } else {
      return { mismatch: true };
    }
  }

  registerForm: FormGroup = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
    confirmPassword: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email])
  }, { validators: this.passwordMatch });

 

  onSubmit(){
    this.isSubmit = true;
    console.log(this.registerForm)
    if(this.registerForm.valid){
      this.authServices.registerRequest(this.registerForm.value).subscribe({
        next:(response)=>{
          console.log(response);
          alert("User registered correctly!")
          this.router.navigateByUrl('/login')
        },
        error:(err)=>{
          console.log(err);
          alert("Registration Failed.\nTry it again later.")
        }
      })
    }
  }
}

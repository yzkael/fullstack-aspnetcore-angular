import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PatientService } from '../../../services/patientServices/patient.service';
import { CreatePatientRequest } from '../../../common/types/patientInterfaces/createPatient';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create.component.html',
})
export class CreateComponent implements OnInit {
  patientServices = inject(PatientService);
  isSubmit = false;
  router = inject(Router);

  ngOnInit(): void {
    this.createPatientForm.patchValue(this.createPatientFormData);
  }

  createPatientFormData: CreatePatientRequest = {
    name: '',
    lastName: '',
  };

  createPatientForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
      Validators.minLength(4),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.maxLength(15),
      Validators.minLength(5),
    ]),
  });

  onSubmit() {
    this.isSubmit = true;
    if (this.createPatientForm.valid) {
      this.patientServices
        .createPatient(this.createPatientForm.value)
        .subscribe({
          next: (response) => {
            alert('Created succesfully');
            this.router.navigateByUrl('/patients');
          },
          error: (err) => {
            alert('Something went wrong while creating Patient');
            throw new Error('Something went wrong: ', err);
          },
        });
    }
  }
}

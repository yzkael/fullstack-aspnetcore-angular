import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { PatientService } from '../../../services/patientServices/patient.service';
import { Patient } from '../../../common/types/patientInterfaces/patients';
import { RouterLink } from '@angular/router';
import { PatientcardComponent } from '../../../common/components/patients/patientCard/patientCard.component';

@Component({
  selector: 'app-menu',
  imports: [RouterLink, PatientcardComponent],
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {
  public patients: Patient[] = [];
  patientServices = inject(PatientService);
  ngOnInit() {
    this.patientServices.getAllPatients().subscribe({
      next: (response) => {
        console.log(response);
        this.patients = response;
      },
      error: (err) => {
        throw new Error('Something went wrong: ', err);
      },
    });
  }
}

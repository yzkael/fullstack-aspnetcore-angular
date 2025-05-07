import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Patient } from '../../common/types/patientInterfaces/patients';
import { CreatePatientRequest } from '../../common/types/patientInterfaces/createPatient';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getAllPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.apiUrl}/api/patients`);
  }

  createPatient(newPatient: CreatePatientRequest): Observable<Patient> {
    return this.http.post<Patient>(
      `${this.apiUrl}/api/patients/create`,
      newPatient
    );
  }
}

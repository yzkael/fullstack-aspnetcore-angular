import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-patientcard',
  imports: [],
  templateUrl: './patientCard.component.html',
})
export class PatientcardComponent {
  @Input() name: string = '';
  @Input() lastName: string = '';
}

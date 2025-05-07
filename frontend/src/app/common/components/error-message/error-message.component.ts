import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  imports: [],
  templateUrl: './error-message.component.html',
})
export class ErrorMessageComponent {
  @Input() control!: AbstractControl | null;
  @Input() isSubmit: boolean = false;

  get shouldShowError(): boolean {
    return !!(this.control?.invalid && (this.isSubmit || this.control?.dirty));
  }
}

import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-error-msg',
  templateUrl: './error-msg.component.html',
  styleUrls: ['./error-msg.component.scss']
})
export class ErrorMsgComponent {
  @Input() control!: FormControl | FormGroup;
  @Input() showRegardless: boolean = false;
  @Input() customError: string | undefined;
  
  private errors: { [key: string]: string } = {
    required: 'Fill in required field',
    pattern: 'Invalid pattern',
  };
  public displayError() {
    const errors = this.control.errors;
    for (const err in errors) {
      if (err === 'minlength') {
        return 'min length must be ' + errors![err]!['requiredLength'];
      }
      if (this.errors[err]) {
        return this.errors[err];
      }
    }
    return this.customError ? this.customError : 'Invalid input';
  }
}

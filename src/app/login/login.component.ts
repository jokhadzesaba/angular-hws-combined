import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ContainerService } from '../container.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public isSigned = false;
  public form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9]+$/),
        Validators.minLength(8),
      ],
    ],
  });
  constructor(private fb: FormBuilder, private userService: ContainerService) {}
  checkUser(): boolean {
    const enteredEmail = this.form.get('user')!;
    const enteredPaswword = this.form.get('password')!;
    const user = this.userService.users.find(
      (e) => e.email === enteredEmail.value
    );
    if (user) {
      if (user.password === enteredPaswword.value) {
        this.isSigned = true;
        return this.isSigned;
      }
    }
    return this.isSigned;
  }
}

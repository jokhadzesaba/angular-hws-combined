import { Component } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ContainerService } from '../container.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent {
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
  constructor(
    private fb: FormBuilder,
    private container: ContainerService,
    private router: Router
  ) {}
  onSubmit(): void {
    const email = this.form.value.email!;
    const password = this.form.value.password!;
    this.container.setEmailPassword(email, password);
    this.router.navigate(['/users']);
    this.container.loggedUserEmail = email;
    this.container.loggedUserPassword = password;
    
  }
}

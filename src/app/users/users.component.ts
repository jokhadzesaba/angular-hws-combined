import { Component } from '@angular/core';
import { ContainerService } from '../container.service';
import { OnInit } from '@angular/core';
import { User } from '../interfaces';
import { FormBuilder, Validators } from '@angular/forms';
import { matchPassword } from '../registration-form/registration-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  public users: User[] = [];
  public editingIndex: number | null = null;
  public removeIndex: boolean = false;
  public updateForm = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9]+$/),
          Validators.minLength(8),
        ],
      ],
      confirmPassword: ['', Validators.required],
      nickname: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z0-9-]+$/)],
      ],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(/^\+995\d{9}$/)],
      ],
      website: [
        '',
        [Validators.required, Validators.pattern(/^https?:\/\/\S+/i)],
      ],
    },
    { validators: matchPassword }
  );
  constructor(
    private containerService: ContainerService,
    private fb: FormBuilder,
    private router: Router

  ) {}
  ngOnInit(): void {
    this.users = this.containerService.users;
  }
  public checkUser(email: string, password: string) {
    if (
      this.containerService.loggedUserEmail === email &&
      this.containerService.loggedUserPassword === password
    ) {
      return true;
    }
    return false;
  }
  public clickRemove(index: number) {
    const email = this.containerService.users[index]['email'];
    const password = this.containerService.users[index]['password'];
    if (this.checkUser(email, password)) {
      this.containerService.users[index].isRemoving =
        !this.containerService.users[index].isRemoving;
    } else {
      alert('you cannot remove this user');
    }
  }
  public remove(index: number) {
    const email = this.containerService.users[index]['email'];
    const password = this.containerService.users[index]['password'];
    if (this.checkUser(email, password)) {
      this.editingIndex = null;
      this.containerService.users.splice(index, 1);
      this.containerService._exists.next(false)
      this.router.navigate(['/login'])
    }
  }
  public editUser(index: number) {
    const email = this.containerService.users[index]['email'];
    const password = this.containerService.users[index]['password'];
    if (this.checkUser(email, password)) {
      this.editingIndex = index;
      const user = this.containerService.users[index];
      this.updateForm.setValue({
        email: user.email,
        nickname: user.nickName,
        password: user.password,
        confirmPassword: user.confirmPassword,
        phoneNumber: user.phoneNumber,
        website: user.website,
      });
    } else {
      alert('you cannot edit this user');
    }
  }
  public updateUser() {
    if (this.editingIndex !== null) {
      const updatedUser = this.updateForm.value;
      const user = this.containerService.users[this.editingIndex];
      user.email = updatedUser.email!;
      user.nickName = updatedUser.nickname!;
      user.phoneNumber = updatedUser.phoneNumber!;
      user.website = updatedUser.website!;
      if (updatedUser.password !== updatedUser.confirmPassword) {
        throw alert('password do not match');
      }
      user.password = updatedUser.password!;
      user.confirmPassword = updatedUser.confirmPassword!;

      if (updatedUser.password) {
        user.password = updatedUser.password;
      }
      this.editingIndex = null;
      this.containerService.loggedUserEmail = updatedUser.email!;
      this.containerService.loggedUserPassword = updatedUser.password!;
      this.updateForm.reset();
    }
  }
}

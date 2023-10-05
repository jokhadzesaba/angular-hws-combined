import { Injectable } from '@angular/core';
import { User } from './interfaces';
import { LogInComponent } from './log-in/log-in.component';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContainerService {
  public users: User[] = [];
  public _exists = new BehaviorSubject<boolean>(false);
  exists = this._exists.asObservable();
  private email: string = '';
  private password: string = '';
  public loggedUserEmail = '';
  public loggedUserPassword = ''
  constructor() {}
  setEmailPassword(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  getEmail(): string {
    return this.email;
  }

  getPassword(): string {
    return this.password;
  }

  checkUserExists(email: string, password: string): boolean {
    const user = this.users.find(u => u.email === email && u.password === password);
    return !!user;
  } 
}

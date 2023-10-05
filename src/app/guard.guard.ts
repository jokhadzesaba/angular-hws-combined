import { ActivatedRoute, CanActivate, Router } from '@angular/router';
import { ContainerService } from './container.service';
import { Injectable } from '@angular/core';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private userService: ContainerService, private router: Router, private route: ActivatedRoute) {}

  canActivate(): boolean {
    const email = this.userService.getEmail();
    const password = this.userService.getPassword();
    const userExists = this.userService.checkUserExists(email, password);
    console.log(email);
    console.log(password);
    console.log(userExists);
    if (userExists) { 
      this.userService._exists.next(true)
      return true;
    } else {
      alert('ACCESS DENIED')
      this.router.navigate(['/login']);
      return false;
    }
  }
}

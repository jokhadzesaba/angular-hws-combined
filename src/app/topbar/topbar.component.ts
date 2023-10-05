import { Component } from '@angular/core';
import { ContainerService } from '../container.service';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent  implements OnInit {
  public userIn!:boolean
  constructor(private containerService:ContainerService, private router: Router){}
  ngOnInit() {
    this.containerService.exists.subscribe(exists => this.userIn = exists);
  }

  logOut(){
    this.containerService._exists.next(false);
    this.containerService.loggedUserEmail = '';
    this.containerService.loggedUserPassword = ''
    this.router.navigate(["/login"]);

  }
}

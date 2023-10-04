import { Injectable } from '@angular/core';
import { User } from './interfaces';
@Injectable({
  providedIn: 'root'
})
export class ContainerService {
  public users: User[] = [];
  constructor() {}
}

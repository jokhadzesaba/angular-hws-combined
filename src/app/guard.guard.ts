import { CanActivateFn } from '@angular/router';
import { ContainerService } from './container.service';
export const guardGuard: CanActivateFn = (route, state) => {
    
  return true;
};

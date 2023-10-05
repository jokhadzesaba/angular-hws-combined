import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValuteExchangeComponent } from './valute-exchange/valute-exchange.component';
import { LogInComponent } from './log-in/log-in.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { UsersComponent } from './users/users.component';
import { AuthGuard } from './guard.guard';

const routes: Routes = [
  { path: 'login', component: LogInComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'registration',
    component: RegistrationFormComponent,
  },
  {
    path: 'exchange',
    component: ValuteExchangeComponent,
  },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})  
export class AppRoutingModule {}

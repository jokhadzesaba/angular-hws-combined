import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValuteExchangeComponent } from './valute-exchange/valute-exchange.component';
import { LogInComponent } from './log-in/log-in.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { UsersComponent } from './users/users.component';
import { AuthGuard } from './guard/guard.guard';
import { EmpoyeeRegistrationComponent } from './employee/employee-registration/employee-registration.component';
import { SingleEmployeeComponent } from './employee/single-employee/single-employee.component';

const routes: Routes = [
  { path: 'login', component: LogInComponent },
  {
    path: 'registration',
    component: RegistrationFormComponent,
  },
  { path: 'employees/:id', component: SingleEmployeeComponent },
  {
    path: 'exchange',
    component: ValuteExchangeComponent,
  },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'employees', component: EmpoyeeRegistrationComponent },
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

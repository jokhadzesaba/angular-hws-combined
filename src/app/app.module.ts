import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TopbarComponent } from './topbar/topbar.component';
import { ValuteExchangeComponent } from './valute-exchange/valute-exchange.component';
import { LogInComponent } from './log-in/log-in.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { ContainerService } from './services/container.service';
import { UsersComponent } from './users/users.component';
import { AuthGuard } from './guard/guard.guard';
import { EmpoyeeRegistrationComponent } from './employee/employee-registration/employee-registration.component';
import { ErrorMsgComponent } from './employee/error-msg/error-msg.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { SingleEmployeeComponent } from './employee/single-employee/single-employee.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    ValuteExchangeComponent,
    TopbarComponent,
    LogInComponent,
    RegistrationFormComponent,
    UsersComponent,
    ErrorMsgComponent,
    EmpoyeeRegistrationComponent,
    EmployeeListComponent,
    SingleEmployeeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [ContainerService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}

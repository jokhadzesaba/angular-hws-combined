import { HttpRequest } from '@angular/common/http';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Employee } from 'src/app/interfaces/interfaces';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';

@Component({
  selector: 'app-employee-registration',
  templateUrl: './employee-registration.component.html',
  styleUrls: ['./employee-registration.component.scss'],
})
export class EmpoyeeRegistrationComponent {
  @Output() onSubmit = new EventEmitter<Employee>();
  @Output() onAddEmployee = new EventEmitter<Employee>();
  employee: Employee | null = null;
  private fb = inject(FormBuilder);
  private employeeService = inject(EmployeeServiceService);
  public form = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9-]+$/)]],
    salary: [0, [Validators.required, Validators.min(1)]],
    age: [0, [Validators.required, Validators.min(18)]],
  });
  name = this.form.get('name') as FormControl;
  salary = this.form.get('salary') as FormControl;
  age = this.form.get('age') as FormControl;

  public submit() {
    const employee: Employee = {
      name: this.form.getRawValue().name!,
      salary: this.form.getRawValue().salary!,
      age: this.form.getRawValue().age!,
      
    };
    this.employeeService.addEmployee(employee).subscribe(()=>{
      this.onAddEmployee.emit(employee); 
    })
    this.form.reset()
    this.onSubmit.emit(employee);
  }

  
}

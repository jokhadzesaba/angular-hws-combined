import { Component, OnInit, inject } from '@angular/core';
import { Validators, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { fileFrom } from 'node-fetch';
import { Employee } from 'src/app/interfaces/interfaces';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
  public allEmployeeData: Employee[] = [];
  
  public isEditing: { [id: number]: boolean } = {};
  p: number = 1;
  constructor(
    private employeeService: EmployeeServiceService,
    private router: Router,
    private fb: FormBuilder
  ) {}
  public form = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9-]+$/)]],
    salary: [0, [Validators.required]],
    age: [0, [Validators.required]],
  });
  private name = this.form.get('name') as FormControl;
  private salary = this.form.get('salary') as FormControl;
  private age = this.form.get('age') as FormControl;

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((employees) => {
      for (let i of employees) {
        this.allEmployeeData.push(i);
        this.isEditing[i.id!] = false;
      }
    });
    this.employeeService.employeeAdded.subscribe((newEmployee: Employee) => {
      this.allEmployeeData.push(newEmployee);
    });
  }
  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe(() => {
      const index = this.allEmployeeData.findIndex(
        (employee) => employee.id === id
      );
      this.allEmployeeData.splice(index, 1);
    });
  }
  editEmployee(id: number) {
    this.isEditing[id] = !this.isEditing[id];
    this.employeeService.getEmployeeById(id).subscribe((employee: Employee) => {
      this.fillFormWhenEditing(employee);
    });
  }
  confirmEdit(id: number) {
    const data = this.form.getRawValue();
    const index = this.allEmployeeData.find((employee) => employee.id === id);
    const employee = {
      name: data.name!,
      age: data.age!,
      salary: data.salary!,
      id: id,
    };
    this.employeeService.editEmployee(employee).subscribe((updatedEmployee:Object) => {
      const updatedEmployeeTyped = updatedEmployee as Employee;
      const index = this.allEmployeeData.findIndex((employee) => employee.id === id);
      this.allEmployeeData[index] = updatedEmployeeTyped;
    });
    this.isEditing[id] = false;
  }
  cancelEdit(id:number) {
    this.isEditing[id] = false;
  }
  goToEmployeeDetails(id: number) {
    this.router.navigate(['employees', id]);
  }
  onAddEmployee(employee: Employee) {
    this.allEmployeeData.push(employee);
  }
  public fillFormWhenEditing(employee: Employee): void {
    this.name.setValue(employee.name);
    this.salary.setValue(employee.salary);
    this.age.setValue(employee.age);
  }
}

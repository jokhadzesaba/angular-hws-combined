import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/interfaces/interfaces';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';

@Component({
  selector: 'app-single-employee',
  templateUrl: './single-employee.component.html',
  styleUrls: ['./single-employee.component.scss'],
})
export class SingleEmployeeComponent {
  employee!: Employee;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeServiceService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const employeeId = params['id'];
      this.getEmployeeDetails(employeeId);
    });
  }

  getEmployeeDetails(id: number): void {
    this.employeeService.getEmployeeById(id).subscribe(
      (employeeData) => {
        this.employee = employeeData;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}

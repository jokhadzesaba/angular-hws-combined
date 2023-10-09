import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../interfaces/interfaces';
import { Observable, tap } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeServiceService {
  constructor(private http: HttpClient) {}
  employeeAdded = new Subject<Employee>();
  getEmployees():Observable<Employee[]> {
    return this.http.get<Employee[]>('http://localhost:3000/employees');
  }
  addEmployee(data: Employee): Observable<Employee> {
    return this.http.post<Employee>('http://localhost:3000/employees', data).pipe(
        tap((newEmployee: Employee) => {
          this.employeeAdded.next(newEmployee);
        })
      );
  }
  getEmployeeById(id: number): Observable<Employee> {
    const url = `http://localhost:3000/employees/${id}`;
    return this.http.get<Employee>(url);
  }
  deleteEmployee(id: number): Observable<{}> {
    const url = `http://localhost:3000/employees/${id}`;
    return this.http.delete(url);
  }
  editEmployee(data:Employee){
    return this.http.put(`http://localhost:3000/employees/${data.id}`, data)

  }
}

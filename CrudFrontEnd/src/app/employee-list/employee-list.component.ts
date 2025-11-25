import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {Employee} from "../employee";
import {EmployeeService} from "../employee.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-employee-list',
    templateUrl: './employee-list.component.html',
    styleUrls: ['./employee-list.component.css'],
    standalone: false
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[] = [];

  constructor(
    private employeeService:EmployeeService,
    private router:Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  private getEmployees(){
    this.employeeService.getEmployeeList().subscribe({
      next: (data: Employee[]) => {
        console.log('Employee list response:', data);
        console.log('Number of employees:', data.length);
        this.employees = data;
        console.log('Employees array after assignment:', this.employees);
        console.log('Array length in component:', this.employees.length);
        // Force change detection
        this.cdr.markForCheck();
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Failed to load employees', error);
      }
    });
  }

  updateEmployee(id: number | undefined){
    if (id !== undefined) {
      this.router.navigate(['update-employee', id]);
    }
  }

  deleteEmployee(id: number | undefined){
    if (id !== undefined) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: (data) => {
          console.log(data);
          this.getEmployees();
          this.cdr.markForCheck();
        },
        error: (error) => {
          console.error('Failed to delete employee', error);
        }
      });
    }
  }
  
  viewEmployee(id: number | undefined){
    if (id !== undefined) {
      this.router.navigate(['employee-details', id]);
    }
  }

  trackByEmployeeId(index: number, employee: Employee): number | undefined {
    return employee.id;
  }
}

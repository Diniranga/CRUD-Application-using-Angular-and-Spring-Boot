import { Component, OnInit } from '@angular/core';
import {Employee} from "../employee";
import {EmployeeService} from "../employee.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-update-employee',
    templateUrl: './update-employee.component.html',
    styleUrls: ['./update-employee.component.css'],
    standalone: false
})
export class UpdateEmployeeComponent implements OnInit {

  id: number | undefined;
  employee: Employee = {
    id: undefined,
    firstname: '',
    lastname: '',
    emailID: ''
  };

  constructor(private Employee_Service:EmployeeService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    const routeId = this.route.snapshot.params['id'];
    this.id = routeId ? Number(routeId) : undefined;

    if (this.id !== undefined) {
      this.Employee_Service.getEmployeebyID(this.id).subscribe({
        next: (data) => {
          this.employee = data;
        },
        error: (error) => {
          console.error('Failed to load employee', error);
        }
      });
    }
  }

  onSubmit(){
    if (this.id !== undefined) {
      this.Employee_Service.updateEmployee(this.id, this.employee).subscribe({
        next: (data) => {
          this.goToEmployeeList();
        },
        error: (error) => {
          console.error('Failed to update employee', error);
        }
      });
    }
  }

  goToEmployeeList(){
    this.router.navigate(['/employees']);
  }

}

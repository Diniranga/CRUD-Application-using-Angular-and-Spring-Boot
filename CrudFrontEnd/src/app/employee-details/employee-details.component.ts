import { Component, OnInit } from '@angular/core';
import {Employee} from "../employee";
import {ActivatedRoute} from "@angular/router";
import {EmployeeService} from "../employee.service";

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  id: Number | undefined
  // @ts-ignore
  employee: Employee;
  constructor(private route:ActivatedRoute,private employee_service:EmployeeService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    // @ts-ignore
    this.employee = new Employee();
    this.employee_service.getEmployeebyID(this.id).subscribe(data =>{
      this.employee = data;
    });
  }
}

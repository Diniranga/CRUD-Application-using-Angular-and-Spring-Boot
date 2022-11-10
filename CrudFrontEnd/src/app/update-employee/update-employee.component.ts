import { Component, OnInit } from '@angular/core';
import {Employee} from "../employee";
import {EmployeeService} from "../employee.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  id: Number | undefined;
  // @ts-ignore
  employee: Employee = new Employee();

  constructor(private Employee_Service:EmployeeService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.Employee_Service.getEmployeebyID(this.id).subscribe(data =>{
      this.employee = data ;
    },error => console.log(error))
  }

  onSubmit(){
    this.Employee_Service.updateEmployee(this.id,this.employee).subscribe(data =>{
      this.goToEmployeeList();
    },error => console.log(error));
  }

  goToEmployeeList(){
    this.router.navigate(['/employees']);
  }

}

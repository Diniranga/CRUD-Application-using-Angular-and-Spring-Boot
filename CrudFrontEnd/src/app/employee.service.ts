import { Injectable } from '@angular/core';
import {Observable, observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Employee} from "./employee";


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseURL = "http://localhost:8080/api/v1/employees";

  constructor(private httpclient:HttpClient) {}



  // @ts-ignore
  getEmployeeList(): observable<Employee[]>{
      return this.httpclient.get<Employee[]>(`${this.baseURL}`);
  }

  addEmployee(emp : Employee):Observable<Object>{
    return this.httpclient.post(`${this.baseURL}`,emp);
  }

  getEmployeebyID(id: Number | undefined):Observable<Employee>{
    return this.httpclient.get<Employee>(`${this.baseURL}/${id}`);
  }

  updateEmployee(id: Number | undefined, emp: Employee):Observable<Object>{
    return this.httpclient.put(`${this.baseURL}/${id}`,emp);
  }

  deleteEmployee(id:Number):Observable<Object>{
    return this.httpclient.delete(`${this.baseURL}/${id}`);
  }

}

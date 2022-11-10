package com.example.crud.controller;

import com.example.crud.exception.ResourceNotFoundException;
import com.example.crud.model.Employee;
import com.example.crud.repository.Emp_Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v1/")


public class EmployeeController {
    @Autowired
    private Emp_Repository emp_repo;

    @GetMapping("/employees")
    public List<Employee> GetAllEmployees(){

        return emp_repo.findAll();
    }

    @PostMapping("/employees")
    public  Employee CreateEmployee(@RequestBody Employee s_emp){
        return emp_repo.save(s_emp);
    }

    @GetMapping("/employees/{id}")
    public ResponseEntity<Employee> getEmployeebyID(@PathVariable long id){
        Employee emp = emp_repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Employee Does Not Exist with id: "+id));
        return ResponseEntity.ok(emp);
    }

    //update
    @PutMapping("/employees/{id}")
    public  ResponseEntity<Employee> UpdateEmployee(@PathVariable long id,@RequestBody Employee emp_details){
        Employee emp = emp_repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Employee Does Not Exist with id: "+id));

        emp.setFirstname(emp_details.getFirstname());
        emp.setLastname(emp_details.getLastname());
        emp.setEmailID(emp.getEmailID());

        Employee updated_employee = emp_repo.save(emp);
        return ResponseEntity.ok(updated_employee);
    }

    //delete
    @DeleteMapping("/employees/{id}")
    public ResponseEntity<Map<String,Boolean>> deleteEmployee(@PathVariable long id){
        Employee emp = emp_repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id: "+id));

        emp_repo.delete(emp);
        Map<String,Boolean> response = new HashMap<>();
        response.put("Deleted",Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

}

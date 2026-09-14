package com.contextflow.controller;

import org.springframework.web.bind.annotation.*;

import com.contextflow.dto.CreateEmployeeRequest;
import com.contextflow.service.EmployeeService;

@RestController 
@RequestMapping("/api/admin/employees")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService){
        this.employeeService = employeeService;
    }

    @PostMapping 
    public String createEmployee(@RequestBody CreateEmployeeRequest request){
        return employeeService.createEmployee(request);
    }
    
}

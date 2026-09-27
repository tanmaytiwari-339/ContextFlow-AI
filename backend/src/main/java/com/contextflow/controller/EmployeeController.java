package com.contextflow.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;
import com.contextflow.dto.EmployeeResponse;
import com.contextflow.dto.UpdateEmployeeRequest;
import com.contextflow.dto.UpdateEmployeeStatusRequest;
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

    @GetMapping 
    public List<EmployeeResponse> getAllEmployees(){
        return employeeService.getAllEmployee()
                .stream()
                .map(EmployeeResponse::new)
                .toList();
    }
    @GetMapping("/{id}")
    public EmployeeResponse getEmployeeById(@PathVariable Long id) {
        return employeeService.getEmployeeById(id);
    }

    @PutMapping("/{id}")
    public EmployeeResponse updateEmployee(
            @PathVariable Long id,
            @RequestBody UpdateEmployeeRequest request) {

        return employeeService.updateEmployee(id, request);
    }

    @PutMapping("/{id}/status")
    public EmployeeResponse updateEmployeeStatus(
            @PathVariable Long id,
            @RequestBody UpdateEmployeeStatusRequest request){
        return employeeService.updateEmployeeStatus(id, request);
    }
}

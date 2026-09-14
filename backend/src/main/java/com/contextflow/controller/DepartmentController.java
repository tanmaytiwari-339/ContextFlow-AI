package com.contextflow.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.contextflow.entity.Department;
import com.contextflow.service.DepartmentService;

@RestController 
@RequestMapping("/api/departments")
public class DepartmentController {

    private final DepartmentService departmentService;

    public DepartmentController(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    @PostMapping
    public Department createDepartment(@RequestBody Department department){
        return departmentService.createDepartment(department);
    }

    @GetMapping 
    public List<Department> getAllDepartments(){
        return departmentService.getAllDepartments();
    }
    
}

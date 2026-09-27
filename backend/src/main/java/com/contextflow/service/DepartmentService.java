package com.contextflow.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.contextflow.entity.Department;
import com.contextflow.repository.DepartmentRepository;

@Service
public class DepartmentService {
    
    private final DepartmentRepository departmentRepository;

    public DepartmentService(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    public Department createDepartment(Department department) {
        return departmentRepository.save(department);
    }

    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

}

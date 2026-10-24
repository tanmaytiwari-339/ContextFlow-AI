
package com.contextflow.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.contextflow.entity.Department;
import com.contextflow.repository.DepartmentRepository;
import com.contextflow.repository.UserRepository;

@Service
public class DepartmentService {

    private final DepartmentRepository departmentRepository;
    private final UserRepository userRepository;

    public DepartmentService(
            DepartmentRepository departmentRepository,
            UserRepository userRepository) {
        this.departmentRepository = departmentRepository;
        this.userRepository = userRepository;
    }

    public Department createDepartment(Department department) {
        String name = validateName(department.getName());

        if (departmentRepository.findByName(name).isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Department already exists"
            );
        }

        department.setName(name);
        return departmentRepository.save(department);
    }

    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    public Department updateDepartment(Long id, Department updatedDepartment) {
        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Department not found"
                ));

        String name = validateName(updatedDepartment.getName());

        departmentRepository.findByName(name).ifPresent(existing -> {
            if (!existing.getId().equals(id)) {
                throw new ResponseStatusException(
                        HttpStatus.CONFLICT,
                        "Department name already exists"
                );
            }
        });

        department.setName(name);
        return departmentRepository.save(department);
    }

    
    public void deleteDepartment(Long id) {
        Department department = departmentRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Department not found"
            ));

        long employeeCount = userRepository.countByDepartment_Id(id);

        if (employeeCount > 0) {
            System.out.println("STEP 4: Throwing 409 Conflict");

            throw new ResponseStatusException(
                HttpStatus.CONFLICT,
                "Cannot delete department because employees are assigned to it"
            );
        }

        departmentRepository.delete(department);

    }

    private String validateName(String name) {
        if (name == null || name.trim().isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Department name cannot be empty"
            );
        }

        return name.trim();
    }
}

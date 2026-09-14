package com.contextflow.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.contextflow.dto.CreateEmployeeRequest;
import com.contextflow.entity.Department;
import com.contextflow.entity.Position;
import com.contextflow.entity.User;
import com.contextflow.repository.DepartmentRepository;
import com.contextflow.repository.PositionRepository;
import com.contextflow.repository.UserRepository;

@Service 
public class EmployeeService {

    private final UserRepository userRepository;
    private final DepartmentRepository departmentRepository;
    private final PositionRepository positionRepository;
    private final PasswordEncoder passwordEncoder;

    public EmployeeService(
            UserRepository userRepository,
            DepartmentRepository departmentRepository,
            PositionRepository positionRepository,
            PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.departmentRepository = departmentRepository;
        this.positionRepository = positionRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public String createEmployee(CreateEmployeeRequest request){

        if(userRepository.findByEmployeeId(request.getEmployeeId()).isPresent()){
            return "Employee Id already exists";
        }

        Department department = departmentRepository
                .findById(request.getDepartmentId())
                .orElseThrow(() -> new RuntimeException("Department not found"));

        Position position  = positionRepository
            .findById(request.getPositionId())
            .orElseThrow(() -> new RuntimeException("Position not found"));

        User user = new User();

        user.setEmployeeId(request.getEmployeeId());
        user.setName(request.getName());

        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );

        user.setDepartment(department);
        user.setPosition(position);

        user.setRole("EMPLOYEE");

        userRepository.save(user);

        return "Employee craeted successfully";

    }

}

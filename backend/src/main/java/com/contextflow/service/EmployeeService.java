package com.contextflow.service;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.contextflow.dto.CreateEmployeeRequest;
import com.contextflow.dto.EmployeeResponse;
import com.contextflow.dto.UpdateEmployeeRequest;
import com.contextflow.dto.UpdateEmployeeStatusRequest;
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
    public List<User> getAllEmployee(){
        return userRepository.findByRole("EMPLOYEE");
    }
    public EmployeeResponse getEmployeeById(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        return new EmployeeResponse(user);
    }
    public EmployeeResponse updateEmployee(Long id, UpdateEmployeeRequest request){
        User user = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Employee not found"));

        Department department = departmentRepository
            .findById(request.getDepartmentId())
            .orElseThrow(() -> new RuntimeException("Department not found"));
        
        Position position = positionRepository
            .findById(request.getPositionId())
            .orElseThrow(() -> new RuntimeException("Position not found"));
        user.setName(request.getName());
        user.setDepartment(department);
        user.setPosition(position);

        userRepository.save(user);

        return new EmployeeResponse(user);
    }
    public EmployeeResponse updateEmployeeStatus(Long id, UpdateEmployeeStatusRequest request){
        User user = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Employee not found"));

        user.setActive(request.isActive());

        userRepository.save(user);

        return new EmployeeResponse(user);
        
    }

}

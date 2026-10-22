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
import com.contextflow.repository.DocumentRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import com.contextflow.repository.ActivityRepository;
import com.contextflow.repository.DocumentAccessRepository;
import org.springframework.transaction.annotation.Transactional;

@Service 
public class EmployeeService {

    private final UserRepository userRepository;
    private final DepartmentRepository departmentRepository;
    private final PositionRepository positionRepository;
    private final PasswordEncoder passwordEncoder;
    private final DocumentRepository documentRepository;
    private final ActivityRepository activityRepository;
    private final DocumentAccessRepository documentAccessRepository;

    public EmployeeService(
            UserRepository userRepository,
            DepartmentRepository departmentRepository,
            PositionRepository positionRepository,
            PasswordEncoder passwordEncoder,
            DocumentRepository documentRepository,
            ActivityRepository activityRepository,
            DocumentAccessRepository documentAccessRepository
        ) {

        this.userRepository = userRepository;
        this.departmentRepository = departmentRepository;
        this.positionRepository = positionRepository;
        this.passwordEncoder = passwordEncoder;
        this.documentRepository = documentRepository;
        this.activityRepository = activityRepository;
        this.documentAccessRepository = documentAccessRepository;
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

        return "Employee created successfully";

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
    @Transactional 
    public void deleteEmployee(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Employee not found"
                ));

        if (!"EMPLOYEE".equals(user.getRole())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Only employee accounts can be deleted here"
            );
        }

        if (documentRepository.existsByUser_Id(id)) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Cannot delete this employee because they own documents. Reassign or remove their documents first."
            );
        }

        if (activityRepository.existsByUser_Id(id)) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Cannot delete this employee because activity history exists. Deactivate the account instead."
            );
        }
        documentAccessRepository.deleteByEmployee_Id(id);
        userRepository.delete(user);
    }




}

package com.contextflow.repository;
import com.contextflow.entity.User;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmployeeId(String employeeId);

    List<User> findByRole(String role);
    
    long countByDepartment_Id(Long departmentId);

    long countByPosition_Id(Long positionId);
    
}

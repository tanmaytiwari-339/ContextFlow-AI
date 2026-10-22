
package com.contextflow.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.contextflow.entity.DocumentAccess;

public interface DocumentAccessRepository extends JpaRepository<DocumentAccess, Long> {

    void deleteByEmployee_Id(Long employeeId);

}


package com.contextflow.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.contextflow.entity.Document;
import com.contextflow.entity.User;

public interface DocumentRepository extends JpaRepository<Document, Long>{
    List<Document> findByUser(User user);
    Optional<Document> findByIdAndUser(Long id,User user);

    boolean existsByUser_Id(Long userId);

    
}

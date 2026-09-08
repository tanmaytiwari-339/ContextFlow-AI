package com.contextflow.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.contextflow.entity.Document;
import com.contextflow.entity.User;

public interface DocumentRepository extends JpaRepository<Document, Long>{
    List<Document> findByUser(User user);
    
}

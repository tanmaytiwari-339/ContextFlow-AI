package com.contextflow.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.contextflow.entity.Document;

public interface DocumentRepository extends JpaRepository<Document, Long>{
    
}

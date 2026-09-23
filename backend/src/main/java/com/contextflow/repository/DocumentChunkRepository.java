package com.contextflow.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.contextflow.entity.Document;
import com.contextflow.entity.DocumentChunk;

public interface DocumentChunkRepository
        extends JpaRepository<DocumentChunk, Long> {

    List<DocumentChunk> findByDocument(Document document);
}

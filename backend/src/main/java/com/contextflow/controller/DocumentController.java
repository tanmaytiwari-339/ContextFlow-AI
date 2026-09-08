package com.contextflow.controller;
import java.io.IOException;
import java.util.List;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.contextflow.dto.DocumentResponse;
import com.contextflow.entity.Document;
import com.contextflow.service.DocumentService;


@RestController 
@RequestMapping("/api/documents")
public class DocumentController {

    private final DocumentService documentService;

    public DocumentController(DocumentService documentService){
        this.documentService = documentService;
    }
    
    @PostMapping
    public DocumentResponse uploadDocument(@RequestParam("file") MultipartFile file) throws IOException{
        Document document = documentService.uploadDocument(file);
        return new DocumentResponse(document);
    }
    @GetMapping
    public List<DocumentResponse> getMyDocuments(){

        return documentService.getMyDocuments()
            .stream()
            .map(DocumentResponse::new)
            .toList();
    }
}

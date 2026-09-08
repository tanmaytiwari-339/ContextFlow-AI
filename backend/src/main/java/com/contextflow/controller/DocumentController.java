package com.contextflow.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.contextflow.service.DocumentService;


@RestController 
@RequestMapping("/api/documents")
public class DocumentController {

    private final DocumentService documentService;

    public DocumentController(DocumentService documentService){
        this.documentService = documentService;
    }
    
    @PostMapping
    public String uploadDocument(@RequestParam("file") MultipartFile file){
        return "Received: "+ file.getOriginalFilename();
    }
    
}

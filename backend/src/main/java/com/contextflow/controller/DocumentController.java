package com.contextflow.controller;
import java.io.IOException;
import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.contextflow.dto.DocumentResponse;
import com.contextflow.dto.SummaryResponse;
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

        return documentService.getAccessibleDocuments()
            .stream()
            .map(DocumentResponse::new)
            .toList();
    }
    @DeleteMapping("/{id}")
    public String deleteDocument(@PathVariable Long id) throws IOException{
        documentService.deleteDocument(id);
        return "Document deleted successfully";
    }
    @GetMapping("/{id}/download")
    public ResponseEntity<Resource> downloadDocument(@PathVariable Long id){
        Resource resource = documentService.getDocumentFile(id);
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .body(resource);
    }

    @PostMapping("/{id}/summary")
    public SummaryResponse summarizeDocument(@PathVariable Long id){
        
        String summary = documentService.summarizeDocument(id);

        return new SummaryResponse(id, summary);
    }
}

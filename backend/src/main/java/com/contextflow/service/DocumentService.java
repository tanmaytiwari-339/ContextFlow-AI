package com.contextflow.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.contextflow.entity.Document;
import com.contextflow.entity.DocumentStatus;
import com.contextflow.entity.User;
import com.contextflow.repository.DocumentRepository;




@Service
public class DocumentService {

    private final DocumentRepository documentRepository;
    private final PdfTextExtractor pdfTextExtractor;

    public DocumentService(DocumentRepository documentRepository,PdfTextExtractor pdfTextExtractor){
        this.documentRepository = documentRepository;
        this.pdfTextExtractor = pdfTextExtractor;
    }

    public User getLoggedInUser(){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        return (User) authentication.getPrincipal();
    }

    public Document saveDocument(Document document){

        User loggedInUser = getLoggedInUser();

        document.setUser(loggedInUser);

        return documentRepository.save(document);

    }

    public String saveFile(MultipartFile file) throws IOException{
        Path uploadPath = Paths.get("uploads");
        Files.createDirectories(uploadPath);
        Path filePath = uploadPath.resolve(file.getOriginalFilename());
        Files.copy(
            file.getInputStream(),
            filePath
        );
        return filePath.toString();
    }
    public Document uploadDocument(MultipartFile file) throws IOException{
        
        String filePath = saveFile(file);
        User loggedInUser = getLoggedInUser();

        String extractedText = pdfTextExtractor.extractText(filePath);
        
        Document document = new Document();

        document.setUser(loggedInUser);
        document.setFileName(file.getOriginalFilename());
        document.setFileType(file.getContentType());
        document.setFileSize(file.getSize());
        document.setFilePath(filePath);
        document.setContent(extractedText);
        document.setStatus(DocumentStatus.UPLOADED);

        LocalDateTime now = LocalDateTime.now();

        document.setUploadedAt(now);
        document.setUpdatedAt(now);

        return documentRepository.save(document);
    }
    public List<Document> getMyDocuments(){
        User loggedInUser = getLoggedInUser();
        return documentRepository.findByUser(loggedInUser);
    }

    public void deleteDocument(long id) throws IOException{

        User loggedInUser = getLoggedInUser();

        Document document = documentRepository
                .findByIdAndUser(id, loggedInUser)
                .orElseThrow(() -> new RuntimeException("Document not found"));
        Path filepath = Paths.get(document.getFilePath());
        Files.deleteIfExists(filepath);
        documentRepository.delete(document);
    }
    public Resource getDocumentFile(Long id){

        User loggedInUser = getLoggedInUser();

        Document document = documentRepository
                .findByIdAndUser(id, loggedInUser)
                .orElseThrow(() ->
                        new RuntimeException("Document not found"));

        Path path = Paths.get(document.getFilePath());
        if (!Files.exists(path)) {
            throw new RuntimeException("File not found");
        }

        return new FileSystemResource(path);
    }


}

package com.contextflow.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.contextflow.entity.AccessType;
import com.contextflow.entity.Document;
import com.contextflow.entity.DocumentAccess;
import com.contextflow.entity.DocumentStatus;
import com.contextflow.entity.User;
import com.contextflow.repository.DocumentRepository;
@Service
public class DocumentService {

    private final DocumentRepository documentRepository;
    private final PdfTextExtractor pdfTextExtractor;
    private final OllamaChatService ollamaChatService;
    private final DocumentAccessService documentAccessService;
    private final DocumentChunkService documentChunkService;
    private final ActivityService activityService;

    public DocumentService(
        DocumentRepository documentRepository,
        PdfTextExtractor pdfTextExtractor,
        OllamaChatService ollamaChatService,
        DocumentAccessService documentAccessService,
        DocumentChunkService documentChunkService,
        ActivityService activityService) {
        this.documentRepository = documentRepository;
        this.pdfTextExtractor = pdfTextExtractor;
        this.ollamaChatService = ollamaChatService;
        this.documentAccessService = documentAccessService;
        this.documentChunkService = documentChunkService;
        this.activityService = activityService;
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
            filePath,
            StandardCopyOption.REPLACE_EXISTING
        );
        return filePath.toString();
    }
    public Document uploadDocument(MultipartFile file) throws IOException{
        
        String filePath = saveFile(file);
        User loggedInUser = getLoggedInUser();

        Document document = new Document();

        document.setUser(loggedInUser);
        document.setFileName(file.getOriginalFilename());
        document.setFileType(file.getContentType());
        document.setFileSize(file.getSize());
        document.setFilePath(filePath);

        LocalDateTime now = LocalDateTime.now();
        document.setUploadedAt(now);
        document.setUpdatedAt(now);

        document.setStatus(DocumentStatus.PROCESSING);

        document = documentRepository.save(document);

        try{
            String extractedText = pdfTextExtractor.extractText(filePath);

            document.setContent(extractedText);
            document.setStatus(DocumentStatus.COMPLETED);

        } catch (Exception e){
            document.setStatus(DocumentStatus.FAILED);
            document.setUpdatedAt(LocalDateTime.now());

            documentRepository.save(document);

            throw e;
        }

        document.setUpdatedAt(LocalDateTime.now());
        document = documentRepository.save(document);
        documentChunkService.createChunks(document);

        DocumentAccess access = new DocumentAccess();
        access.setDocument(document);
        access.setAccessType(AccessType.EMPLOYEE);
        access.setEmployee(loggedInUser);
        documentAccessService.createAccessRule(access);
        activityService.logActivity(
                loggedInUser,
                "DOCUMENT_UPLOADED",
                "Uploaded document: " + document.getFileName()
        );
        return document;
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

        if (!documentAccessService.canAccess(document, loggedInUser)) {
            throw new RuntimeException("You do not have access to this document");
        }

        Path path = Paths.get(document.getFilePath());
        if (!Files.exists(path)) {
            throw new RuntimeException("File not found");
        }
        return new FileSystemResource(path);
    }

    public String summarizeDocument(Long id){

        User loggedInUser = getLoggedInUser();

        Document document = documentRepository
            .findById(id)
            .orElseThrow(() -> new RuntimeException("Document not found"));
        
        if (!documentAccessService.canAccess(document, loggedInUser)) {
            throw new RuntimeException("You do not have access to this document");
        }

        String content = document.getContent();

        if(content==null || content.isBlank()){
            throw new RuntimeException("Document has no extracted text");
        }
        String prompt = """
                Summarize the following document.

                Give:
                1. A short overall summary
                2. The main points
                3. Important information or conclusions

                Keep the summary clear and concise.

                Document:
                """ + content;
        
        String summary = ollamaChatService.generateResponse(prompt);

        document.setSummary(summary);
        document.setUpdatedAt(LocalDateTime.now());
        documentRepository.save(document);
        return summary;
    }
    public List<Document> getAccessibleDocuments(){
        User loggedInUser = getLoggedInUser();
        return documentAccessService.getAccessibleDocuments(loggedInUser);
    }
}

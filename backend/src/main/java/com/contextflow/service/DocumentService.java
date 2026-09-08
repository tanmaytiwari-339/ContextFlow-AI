package com.contextflow.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.contextflow.entity.Document;
import com.contextflow.entity.User;
import com.contextflow.repository.DocumentRepository;



@Service
public class DocumentService {

    private final DocumentRepository documentRepository;

    public DocumentService(DocumentRepository documentRepository){
        this.documentRepository = documentRepository;
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

}

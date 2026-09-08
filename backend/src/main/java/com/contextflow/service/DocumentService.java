package com.contextflow.service;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

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
}

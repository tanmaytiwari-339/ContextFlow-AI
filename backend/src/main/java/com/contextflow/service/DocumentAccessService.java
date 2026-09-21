package com.contextflow.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.contextflow.entity.AccessType;
import com.contextflow.entity.Document;
import com.contextflow.entity.DocumentAccess;
import com.contextflow.entity.User;
import com.contextflow.repository.DocumentAccessRepository;

@Service
public class DocumentAccessService {

    private final DocumentAccessRepository documentAccessRepository;

    public DocumentAccessService(DocumentAccessRepository documentAccessRepository) {
        this.documentAccessRepository = documentAccessRepository;
    }

    public boolean canAccess(Document document, User employee){
        return documentAccessRepository.findAll()
                .stream()
                .anyMatch(access -> {
                    if (!access.getDocument().getId().equals(document.getId())) {
                        return false;
                    }
                    if (access.getAccessType() == AccessType.EVERYONE) {
                        return true;
                    }

                    if (access.getAccessType() == AccessType.DEPARTMENT) {
                        return access.getDepartment() != null
                                && employee.getDepartment() != null
                                && access.getDepartment().getId()
                                        .equals(employee.getDepartment().getId());
                    }

                    if (access.getAccessType() == AccessType.POSITION) {
                        return access.getPosition() != null
                                && employee.getPosition() != null
                                && access.getPosition().getId()
                                        .equals(employee.getPosition().getId());
                    }

                    if (access.getAccessType() == AccessType.EMPLOYEE) {
                        return access.getEmployee() != null
                                && access.getEmployee().getId()
                                        .equals(employee.getId());
                    }

                    return false;
                });
    }
    public DocumentAccess createAccessRule(DocumentAccess access) {
        return documentAccessRepository.save(access);
    }
    public List<Document> getAccessibleDocuments(User employee){

        return documentAccessRepository.findAll()
                .stream()
                .filter(access -> {
                    Document document = access.getDocument();

                    if(access.getAccessType() == AccessType.EVERYONE){
                        return true;
                    }
                    if(access.getAccessType() == AccessType.DEPARTMENT){
                        return access.getDepartment() != null
                                && employee.getDepartment() != null
                                && access.getDepartment().getId()
                                        .equals(employee.getDepartment().getId());
                    }
                    if (access.getAccessType() == AccessType.POSITION) {
                        return access.getPosition() != null
                                && employee.getPosition() != null
                                && access.getPosition().getId()
                                        .equals(employee.getPosition().getId());
                    }
                    if (access.getAccessType() == AccessType.EMPLOYEE) {
                        return access.getEmployee() != null
                                && access.getEmployee().getId()
                                        .equals(employee.getId());
                    }
                    return false;

                })
                .map(DocumentAccess::getDocument)
                .distinct()
                .toList();
        
    }
    
}

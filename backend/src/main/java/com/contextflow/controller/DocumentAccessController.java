package com.contextflow.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.contextflow.entity.AccessType;
import com.contextflow.entity.Department;
import com.contextflow.entity.Document;
import com.contextflow.entity.DocumentAccess;
import com.contextflow.entity.Position;
import com.contextflow.entity.User;
import com.contextflow.repository.DepartmentRepository;
import com.contextflow.repository.DocumentRepository;
import com.contextflow.repository.PositionRepository;
import com.contextflow.repository.UserRepository;
import com.contextflow.service.DocumentAccessService;

@RestController
@RequestMapping("/api/admin/document-access")
public class DocumentAccessController {

    private final DocumentAccessService documentAccessService;
    private final DocumentRepository documentRepository;
    private final DepartmentRepository departmentRepository;
    private final PositionRepository positionRepository;
    private final UserRepository userRepository;

    public DocumentAccessController(
            DocumentAccessService documentAccessService,
            DocumentRepository documentRepository,
            DepartmentRepository departmentRepository,
            PositionRepository positionRepository,
            UserRepository userRepository) {

        this.documentAccessService = documentAccessService;
        this.documentRepository = documentRepository;
        this.departmentRepository = departmentRepository;
        this.positionRepository = positionRepository;
        this.userRepository = userRepository;
    }

    @PostMapping 
    public String createAccessRule(@RequestParam Long documentId,
                                   @RequestParam AccessType accessType,
                                   @RequestParam(required = false) Long departmentId,
                                   @RequestParam(required = false) Long positionId,
                                   @RequestParam(required = false) Long employeeId) {

        Document document = documentRepository.findById(documentId)
                .orElseThrow(() -> new RuntimeException("Document not found"));

        DocumentAccess access = new DocumentAccess();
        access.setDocument(document);
        access.setAccessType(accessType);

        if (departmentId != null) {
            Department department = departmentRepository.findById(departmentId)
                    .orElseThrow(() -> new RuntimeException("Department not found"));
            access.setDepartment(department);
        }

        if (positionId != null) {
            Position position = positionRepository.findById(positionId)
                    .orElseThrow(() -> new RuntimeException("Position not found"));
            access.setPosition(position);
        }

        if (employeeId != null) {
            User employee = userRepository.findById(employeeId)
                    .orElseThrow(() -> new RuntimeException("Employee not found"));
            access.setEmployee(employee);
        }

        documentAccessService.createAccessRule(access);

        return "Access rule created successfully";
    }
}

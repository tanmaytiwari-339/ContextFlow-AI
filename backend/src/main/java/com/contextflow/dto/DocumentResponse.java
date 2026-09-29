package com.contextflow.dto;

import com.contextflow.entity.Document;

public class DocumentResponse {
    private Long id;
    private String fileName;
    private String fileType;
    private Long fileSize;
    private String filePath;
    private String status;
    private String summary;
    private boolean hasSummary;

    public DocumentResponse(Document document) {
        this.id = document.getId();
        this.fileName = document.getFileName();
        this.fileType = document.getFileType();
        this.fileSize = document.getFileSize();
        this.filePath = document.getFilePath();
        this.status = document.getStatus().name();
        this.summary = document.getSummary();
        this.hasSummary = document.getSummary() != null
        && !document.getSummary().isBlank();
    }
    public Long getId() {
        return id;
    }

    public String getFileName() {
        return fileName;
    }

    public String getFileType() {
        return fileType;
    }

    public Long getFileSize() {
        return fileSize;
    }

    public String getFilePath() {
        return filePath;
    }

    public String getStatus() {
        return status;
    }
    public String getSummary() {
        return summary;
    }
    public boolean isHasSummary() {
        return hasSummary;
    }
}

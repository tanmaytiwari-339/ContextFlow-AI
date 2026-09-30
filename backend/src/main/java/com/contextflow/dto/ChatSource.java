package com.contextflow.dto;

public class ChatSource {

    private Long documentId;
    private String title;
    private String docType;
    private Integer chunkIndex;

    public ChatSource(
            Long documentId,
            String title,
            String docType,
            Integer chunkIndex) {

        this.documentId = documentId;
        this.title = title;
        this.docType = docType;
        this.chunkIndex = chunkIndex;
    }

    public Long getDocumentId() {
        return documentId;
    }

    public String getTitle() {
        return title;
    }

    public String getDocType() {
        return docType;
    }

    public Integer getChunkIndex() {
        return chunkIndex;
    }
}

package com.contextflow.dto;

public class SummaryResponse {

    private Long documentId;
    private String summary;

    public SummaryResponse(Long documentId,String summary){
        this.documentId = documentId;
        this.summary = summary;
    }

    public Long getDocumentId(){
        return documentId;
    }
    public String getSummary(){
        return summary;
    }


}
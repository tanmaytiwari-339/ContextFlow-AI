package com.contextflow.entity;

public class SearchResult {
    private DocumentChunk chunk;
    private double score;

    public SearchResult(DocumentChunk chunk, double score) {
        this.chunk = chunk;
        this.score = score;
    }

    public DocumentChunk getChunk() {
        return chunk;
    }

    public double getScore() {
        return score;
    }
}

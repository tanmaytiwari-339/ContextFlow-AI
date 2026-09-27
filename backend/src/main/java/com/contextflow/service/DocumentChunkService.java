package com.contextflow.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.contextflow.entity.Document;
import com.contextflow.entity.DocumentChunk;
import com.contextflow.repository.DocumentChunkRepository;

@Service 
public class DocumentChunkService {

    private final DocumentChunkRepository documentChunkRepository;
    private final EmbeddingService embeddingService;

    public DocumentChunkService(DocumentChunkRepository documentChunkRepository,EmbeddingService embeddingService){
        this.documentChunkRepository = documentChunkRepository;
        this.embeddingService = embeddingService;
    }

    public void createChunks(Document document) {

        String text = document.getContent();

        if (text == null || text.isBlank()) {
            return;
        }

        int chunkSize = 1000;
        int overlap = 200;

        List<DocumentChunk> chunks = new ArrayList<>();

        int start = 0;
        int chunkIndex = 0;

        while (start < text.length()) {

            int end = Math.min(start + chunkSize, text.length());

            String chunkText = text.substring(start, end);

            DocumentChunk chunk = new DocumentChunk();

            chunk.setDocument(document);
            chunk.setChunkIndex(chunkIndex);
            chunk.setContent(chunkText);
            float[] embedding = embeddingService.generateEmbedding(chunkText);

            StringBuilder embeddingText = new StringBuilder();

            for (float value : embedding) {
                embeddingText.append(value).append(",");
            }
            chunk.setEmbedding(embeddingText.toString());
            chunks.add(chunk);


            chunkIndex++;
            if (end == text.length()) {
                break;
            }
            start = end - overlap;

        }

        documentChunkRepository.saveAll(chunks);
    }
    
}

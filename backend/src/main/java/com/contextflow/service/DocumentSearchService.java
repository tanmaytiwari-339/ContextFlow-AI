package com.contextflow.service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import org.springframework.stereotype.Service;

import com.contextflow.entity.Document;
import com.contextflow.entity.DocumentChunk;
import com.contextflow.entity.SearchResult;
import com.contextflow.entity.User;
import com.contextflow.repository.DocumentChunkRepository;

@Service
public class DocumentSearchService {

    private final DocumentChunkRepository documentChunkRepository;
    private final CosineSimilarityService cosineSimilarityService;
    private final EmbeddingService embeddingService;
    private final DocumentService documentService;
    private final DocumentAccessService documentAccessService;

    public DocumentSearchService(
            DocumentChunkRepository documentChunkRepository,
            CosineSimilarityService cosineSimilarityService,
            EmbeddingService embeddingService,
            DocumentService documentService,
            DocumentAccessService documentAccessService
        ) {

        this.documentChunkRepository = documentChunkRepository;
        this.cosineSimilarityService = cosineSimilarityService;
        this.embeddingService = embeddingService;
        this.documentService = documentService;
        this.documentAccessService = documentAccessService;
    }

    public List<SearchResult> search(String query){

        User loggedInUser = documentService.getLoggedInUser();

        float[] queryEmbedding = embeddingService.generateEmbedding(query);

        List<Document> accessibleDocuments = documentAccessService.getAccessibleDocuments(loggedInUser);

        List<SearchResult> scoredChunks = new ArrayList<>();

        for (Document document : accessibleDocuments) {

            List<DocumentChunk> chunks = documentChunkRepository.findAll();
            
            for(DocumentChunk chunk : chunks){
                if (chunk.getEmbedding() == null) {
                    continue;
                }
                float[] chunkEmbedding =
                    cosineSimilarityService.stringToVector(chunk.getEmbedding()
                    );

                double similarity =
                    cosineSimilarityService.calculate(
                            queryEmbedding,
                            chunkEmbedding
                    );

                scoredChunks.add(
                    new SearchResult(chunk, similarity)
                );
            }    
        }

        scoredChunks.sort(
                Comparator.comparingDouble(SearchResult::getScore).reversed()
        );
        return scoredChunks.stream()
                .limit(5)
                .toList();        
    }
}

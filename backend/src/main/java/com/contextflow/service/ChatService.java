package com.contextflow.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.contextflow.entity.SearchResult;

@Service
public class ChatService {
    
    private final DocumentSearchService documentSearchService;
    private final OllamaChatService ollamaChatService;

    public ChatService(
            DocumentSearchService documentSearchService,
            OllamaChatService ollamaChatService) {

        this.documentSearchService = documentSearchService;
        this.ollamaChatService = ollamaChatService;
    }

    public String askQuestion(String question){

        List<SearchResult> results =
                documentSearchService.search(question);

        System.out.println("SEARCH RESULTS:");
        for (SearchResult result : results) {
            System.out.println("Score: " + result.getScore());
            System.out.println("Content: " + result.getChunk().getContent());
        }

        if (results.isEmpty()) {
            return "I could not find relevant information in the available documents.";
        }

        StringBuilder context = new StringBuilder();

        for (SearchResult result : results) {
            context.append(result.getChunk().getContent());
            context.append("\n\n");
        }

        String prompt = """
                You are a document question-answering assistant.

                Your job is to answer the user's question from the DOCUMENT CONTEXT below.

                IMPORTANT:
                - Read the document context carefully.
                - The answer may be explicitly stated in the context.
                - Answer directly and concisely.
                - Do not use outside knowledge.
                - Do not say you cannot find the answer if the answer is present in the context.
                - If the answer is genuinely not present, say:
                "I could not find this information in the available documents."

                Document context:
                %s

                User question:
                %s
                """.formatted(context, question);

        return ollamaChatService.generateResponse(prompt);
    }
}

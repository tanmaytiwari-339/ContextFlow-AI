package com.contextflow.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    private final RestClient restClient;

    public GeminiService(RestClient.Builder builder){
        this.restClient = builder.build();
    }

    public String generateResponse(String prompt){

        String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key="+apiKey;
        Map<String,Object> requestBody = Map.of(
                "contents", new Object[]{
                    Map.of(
                        "parts",new Object[]{
                            Map.of("text",prompt)
                        }
                    )
                }
        );

        Map response = restClient.post()
                .uri(url)
                .body(requestBody)
                .retrieve()
                .body(Map.class);
        
                List<Map<String,Object>> candidates = (List<Map<String,Object>>) response.get("candidates");
                Map<String, Object> firstCandidate = candidates.get(0);
                Map<String, Object> content = (Map<String, Object>) firstCandidate.get("content");
                List<Map<String, String>> parts =
                        (List<Map<String, String>>) content.get("parts");

        return parts.get(0).get("text");

        

    }
    
}

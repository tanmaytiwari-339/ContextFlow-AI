package com.contextflow.service;

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

        String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key="+apiKey;
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
        
        return response.toString();

    }
    
}

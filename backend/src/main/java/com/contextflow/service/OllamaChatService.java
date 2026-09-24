package com.contextflow.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class OllamaChatService {

    private final ChatClient chatClient;
    
    public OllamaChatService(ChatClient.Builder builder){
        this.chatClient = builder.build();
    }

    public String generateResponse(String prompt){

        return chatClient
                .prompt()
                .user(prompt)
                .call()
                .content();
    }
}

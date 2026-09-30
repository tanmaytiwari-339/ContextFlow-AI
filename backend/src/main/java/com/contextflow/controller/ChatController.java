package com.contextflow.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.contextflow.dto.ChatResponse;
import com.contextflow.service.ChatService;

@RestController 
@RequestMapping("/api/chat")
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService){
        this.chatService = chatService;
    }

    @GetMapping
    public ChatResponse chat(
            @RequestParam Long sessionId,
            @RequestParam String question) {

        return chatService.askQuestion(sessionId, question);
    }
    
}

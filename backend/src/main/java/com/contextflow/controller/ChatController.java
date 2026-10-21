package com.contextflow.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.contextflow.dto.ChatResponse;
import com.contextflow.service.ChatService;
import com.contextflow.service.ChatMessageService;

@RestController 
@RequestMapping("/api/chat")
public class ChatController {

    private final ChatService chatService;
    private final ChatMessageService chatMessageService;

    public ChatController(
            ChatService chatService,
            ChatMessageService chatMessageService) {

        this.chatService = chatService;
        this.chatMessageService = chatMessageService;
    }

    @GetMapping
    public ChatResponse chat(
            @RequestParam Long sessionId,
            @RequestParam String question) {

        return chatService.askQuestion(sessionId, question);
    }

    @GetMapping("/count")
    public long getChatCount() {
        return chatMessageService.getMyChatCount();
    }
    
}

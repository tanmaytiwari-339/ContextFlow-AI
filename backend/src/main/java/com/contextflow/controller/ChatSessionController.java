package com.contextflow.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.contextflow.entity.ChatSession;
import com.contextflow.service.ChatSessionService;

@RestController
@RequestMapping("/api/chat/sessions")
public class ChatSessionController {

    private final ChatSessionService chatSessionService;

    public ChatSessionController(ChatSessionService chatSessionService) {
        this.chatSessionService = chatSessionService;
    }

    @PostMapping
    public ChatSession createSession(@RequestParam String title) {
        return chatSessionService.createSession(title);
    }

    @GetMapping
    public List<ChatSession> getMySessions() {
        return chatSessionService.getMySessions();
    }
}
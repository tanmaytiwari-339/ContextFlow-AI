package com.contextflow.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.contextflow.entity.ChatMessage;
import com.contextflow.service.ChatMessageService;

@RestController
@RequestMapping("/api/chat/sessions")
public class ChatMessageController {

    private final ChatMessageService chatMessageService;

    public ChatMessageController(ChatMessageService chatMessageService) {
        this.chatMessageService = chatMessageService;
    }

    @GetMapping("/{sessionId}/messages")
    public List<ChatMessage> getMessages(
            @PathVariable Long sessionId) {

        return chatMessageService.getMessages(sessionId);
    }
}

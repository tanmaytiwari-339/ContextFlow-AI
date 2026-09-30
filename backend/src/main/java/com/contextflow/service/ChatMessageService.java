package com.contextflow.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.contextflow.entity.ChatMessage;
import com.contextflow.entity.ChatSession;
import com.contextflow.repository.ChatMessageRepository;
import com.contextflow.repository.ChatSessionRepository;

@Service
public class ChatMessageService {

    private final ChatMessageRepository chatMessageRepository;
    private final ChatSessionRepository chatSessionRepository;

    public ChatMessageService(
            ChatMessageRepository chatMessageRepository,
            ChatSessionRepository chatSessionRepository) {

        this.chatMessageRepository = chatMessageRepository;
        this.chatSessionRepository = chatSessionRepository;
    }

    public ChatMessage saveMessage(
            Long sessionId,
            String question,
            String answer) {

        ChatSession session = chatSessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Chat session not found"));

        ChatMessage message =
                new ChatMessage(session, question, answer);

        return chatMessageRepository.save(message);
    }

    public List<ChatMessage> getMessages(Long sessionId) {

        ChatSession session = chatSessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Chat session not found"));

        return chatMessageRepository
                .findByChatSessionOrderByCreatedAtAsc(session);
    }
}

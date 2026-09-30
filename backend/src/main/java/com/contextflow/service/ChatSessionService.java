package com.contextflow.service;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.contextflow.entity.ChatSession;
import com.contextflow.entity.User;
import com.contextflow.repository.ChatSessionRepository;

@Service
public class ChatSessionService {

    private final ChatSessionRepository chatSessionRepository;

    public ChatSessionService(ChatSessionRepository chatSessionRepository) {
        this.chatSessionRepository = chatSessionRepository;
    }

    private User getLoggedInUser() {
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        return (User) authentication.getPrincipal();
    }

    public ChatSession createSession(String title) {

        User user = getLoggedInUser();

        ChatSession session = new ChatSession(user, title);

        return chatSessionRepository.save(session);
    }

    public List<ChatSession> getMySessions() {

        User user = getLoggedInUser();

        return chatSessionRepository
                .findByUserOrderByUpdatedAtDesc(user);
    }
}
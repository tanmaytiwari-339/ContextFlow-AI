package com.contextflow.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.contextflow.entity.ChatMessage;
import com.contextflow.entity.ChatSession;
import com.contextflow.entity.User;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

    List<ChatMessage> findByChatSessionOrderByCreatedAtAsc(ChatSession chatSession);

    long countByChatSessionUser(User user);
    
}

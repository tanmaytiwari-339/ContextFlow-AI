package com.contextflow.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.contextflow.entity.ChatSession;
import com.contextflow.entity.User;

public interface ChatSessionRepository extends JpaRepository<ChatSession, Long> {

    List<ChatSession> findByUserOrderByUpdatedAtDesc(User user);
}
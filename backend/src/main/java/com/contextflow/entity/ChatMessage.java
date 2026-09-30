package com.contextflow.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "chat_messages")
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "chat_session_id", nullable = false)
    private ChatSession chatSession;

    @Column(columnDefinition = "LONGTEXT", nullable = false)
    private String question;

    @Column(columnDefinition = "LONGTEXT", nullable = false)
    private String answer;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    public ChatMessage() {
    }

    public ChatMessage(ChatSession chatSession, String question, String answer) {
        this.chatSession = chatSession;
        this.question = question;
        this.answer = answer;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public ChatSession getChatSession() {
        return chatSession;
    }

    public void setChatSession(ChatSession chatSession) {
        this.chatSession = chatSession;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}

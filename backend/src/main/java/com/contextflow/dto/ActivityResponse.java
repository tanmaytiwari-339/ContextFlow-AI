package com.contextflow.dto;

import com.contextflow.entity.Activity;
import java.time.LocalDateTime;

public class ActivityResponse {

    private Long id;
    private String action;
    private String description;
    private LocalDateTime createdAt;

    public ActivityResponse(Activity activity) {
        this.id = activity.getId();
        this.action = activity.getAction();
        this.description = activity.getDescription();
        this.createdAt = activity.getCreatedAt();
    }

    public Long getId() {
        return id;
    }

    public String getAction() {
        return action;
    }

    public String getDescription() {
        return description;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
package com.contextflow.service;

import com.contextflow.entity.Activity;
import com.contextflow.entity.User;
import com.contextflow.repository.ActivityRepository;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ActivityService {

    private final ActivityRepository activityRepository;

    public ActivityService(ActivityRepository activityRepository) {
        this.activityRepository = activityRepository;
    }

    public void logActivity(User user, String action, String description) {

        Activity activity = new Activity();

        activity.setUser(user);
        activity.setAction(action);
        activity.setDescription(description);
        activity.setCreatedAt(LocalDateTime.now());

        activityRepository.save(activity);
    }

    public List<Activity> getMyActivities() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        User user = (User) authentication.getPrincipal();

        return activityRepository.findByUserOrderByCreatedAtDesc(user);
    }

    public List<Activity> getMyProductActivities() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        User user = (User) authentication.getPrincipal();

        List<String> actions = List.of(
                "DOCUMENT_UPLOADED",
                "DOCUMENT_VIEWED",
                "DOCUMENT_DOWNLOADED",
                "DOCUMENT_DELETED",
                "CHAT_USED",
                "SEARCHED"
        );

        return activityRepository
                .findByUserAndActionInOrderByCreatedAtDesc(user, actions);
    }
}
package com.contextflow.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.contextflow.dto.ActivityResponse;
import com.contextflow.dto.ChangePasswordRequest;
import com.contextflow.dto.ProfileResponse;
import com.contextflow.dto.UpdateProfileRequest;
import com.contextflow.entity.Activity;
import com.contextflow.service.ActivityService;
import com.contextflow.service.ProfileService;

@RestController
@RequestMapping("/api/profile") 
public class ProfileController {

    private final ProfileService profileService;

    private final ActivityService activityService;

public ProfileController(ProfileService profileService,
                         ActivityService activityService) {
    this.profileService = profileService;
    this.activityService = activityService;
}
    
    @GetMapping
    public ProfileResponse getProfile() {
        return new ProfileResponse(profileService.getProfile());
    }

    @PutMapping
    public ProfileResponse updateProfile(
            @RequestBody UpdateProfileRequest request) {

        return new ProfileResponse(
            profileService.updateProfile(request.getName())
        );
    }
    @PutMapping("/password")
    public String changePassword(
            @RequestBody ChangePasswordRequest request) {

        profileService.changePassword(request);

        return "Password changed successfully";
    }
    @GetMapping("/activity")
    public List<ActivityResponse> getMyActivities() {
        return activityService.getMyActivities()
                .stream()
                .map(ActivityResponse::new)
                .toList();
    }

    @GetMapping("/my-activity")
    public List<ActivityResponse> getMyProductActivities() {
        return activityService.getMyProductActivities()
                .stream()
                .map(ActivityResponse::new)
                .toList();
    }
}

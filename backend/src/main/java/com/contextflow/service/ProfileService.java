package com.contextflow.service;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.contextflow.dto.ChangePasswordRequest;
import com.contextflow.entity.User;
import com.contextflow.repository.UserRepository;

@Service
public class ProfileService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ActivityService activityService;

    public ProfileService(UserRepository userRepository,
                      PasswordEncoder passwordEncoder,
                      ActivityService activityService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.activityService = activityService;
    }

    public User getProfile() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        return (User) authentication.getPrincipal();
    }

    public User updateProfile(String name) {
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        User user = (User) authentication.getPrincipal();

        user.setName(name);

        User updatedUser = userRepository.save(user);

        activityService.logActivity(
                user,
                "PROFILE_UPDATED",
                "Updated profile information"
        );

        return updatedUser;
    }

    public void changePassword(ChangePasswordRequest request) {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        User user = (User) authentication.getPrincipal();

        // Check current password
        if (!passwordEncoder.matches(
                request.getCurrentPassword(),
                user.getPassword())) {

            throw new RuntimeException("Current password is incorrect");
        }

        // Encode and save new password
        user.setPassword(
                passwordEncoder.encode(request.getNewPassword())
        );

        userRepository.save(user);
        activityService.logActivity(
                user,
                "PASSWORD_CHANGED",
                "Changed account password"
        );
    }
}

package com.contextflow.controller;

import com.contextflow.dto.LoginRequest;
import com.contextflow.dto.RegisterRequest;
import com.contextflow.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService){
        this.authService = authService;
    }
    
    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request){
        return authService.register(request);
    }
    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request){
        return authService.login(request.getEmployeeId(),request.getPassword());
    }
    
}

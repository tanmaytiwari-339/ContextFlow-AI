package com.contextflow.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.contextflow.service.GeminiService;

@RestController
@RequestMapping("/api/ai") 
public class GeminiController {

    private final GeminiService geminiService;

    public GeminiController(GeminiService geminiService){
        this.geminiService = geminiService;

    }

    @PostMapping("/test")
    public String testAI(@RequestBody Map<String,String> request){
        String prompt = request.get("prompt");
        return geminiService.generateResponse(prompt);

    }
    
    
}

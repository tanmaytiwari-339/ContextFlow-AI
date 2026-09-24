package com.contextflow.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.contextflow.entity.SearchResult;
import com.contextflow.service.DocumentSearchService;

@RestController 
public class SearchController {
    
    private final DocumentSearchService documentSearchService;

    public SearchController(DocumentSearchService documentSearchService) {
        this.documentSearchService = documentSearchService;
    }

    @GetMapping("/api/search")
    public List<SearchResult> search(@RequestParam String query) {
        return documentSearchService.search(query);
    }


}

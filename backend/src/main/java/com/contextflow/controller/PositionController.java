package com.contextflow.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.contextflow.entity.Position;
import com.contextflow.service.PositionService;

@RestController
@RequestMapping("/api/positions")
public class PositionController {

    private final PositionService positionService;

    public PositionController(PositionService positionService) {
        this.positionService = positionService;
    }

    @PostMapping
    public Position createPosition(@RequestBody Position position) {
        return positionService.createPosition(position);
    }

    @GetMapping
    public List<Position> getAllPositions() {
        return positionService.getAllPositions();
    }
}

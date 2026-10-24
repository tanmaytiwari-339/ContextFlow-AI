
package com.contextflow.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.contextflow.entity.Position;
import com.contextflow.service.PositionService;

@RestController
@RequestMapping("/api/admin/positions")
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

    @PutMapping("/{id}")
    public Position updatePosition(
            @PathVariable Long id,
            @RequestBody Position position) {
        return positionService.updatePosition(id, position);
    }

    @DeleteMapping("/{id}")
    public void deletePosition(@PathVariable Long id) {
        positionService.deletePosition(id);
    }
}

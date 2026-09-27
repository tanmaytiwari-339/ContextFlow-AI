package com.contextflow.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.contextflow.entity.Position;
import com.contextflow.repository.PositionRepository;

@Service
public class PositionService {

    private final PositionRepository positionRepository;

    public PositionService(PositionRepository positionRepository) {
        this.positionRepository = positionRepository;
    }

    public Position createPosition(Position position) {
        return positionRepository.save(position);
    }

    public List<Position> getAllPositions() {
        return positionRepository.findAll();
    }
}

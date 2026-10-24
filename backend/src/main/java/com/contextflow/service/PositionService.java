
package com.contextflow.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.contextflow.entity.Position;
import com.contextflow.repository.PositionRepository;
import com.contextflow.repository.UserRepository;

@Service
public class PositionService {

    private final PositionRepository positionRepository;
    private final UserRepository userRepository;

    public PositionService(
            PositionRepository positionRepository,
            UserRepository userRepository) {
        this.positionRepository = positionRepository;
        this.userRepository = userRepository;
    }

    public Position createPosition(Position position) {
        if (position.getName() == null || position.getName().trim().isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Position name is required");
        }

        String name = position.getName().trim();

        if (positionRepository.findByName(name).isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT, "Position already exists");
        }

        position.setName(name);
        return positionRepository.save(position);
    }

    public List<Position> getAllPositions() {
        return positionRepository.findAll();
    }

    public Position updatePosition(Long id, Position updatedPosition) {
        Position existingPosition = positionRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Position not found"));

        if (updatedPosition.getName() == null
                || updatedPosition.getName().trim().isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Position name is required");
        }

        String name = updatedPosition.getName().trim();

        positionRepository.findByName(name).ifPresent(position -> {
            if (!position.getId().equals(id)) {
                throw new ResponseStatusException(
                        HttpStatus.CONFLICT, "Position already exists");
            }
        });

        existingPosition.setName(name);
        return positionRepository.save(existingPosition);
    }

    public void deletePosition(Long id) {
        Position position = positionRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Position not found"));

        long assignedEmployees = userRepository.countByPosition_Id(id);

        if (assignedEmployees > 0) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Cannot delete position because employees are assigned to it");
        }

        positionRepository.delete(position);
    }
}

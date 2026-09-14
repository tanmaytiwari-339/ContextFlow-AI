package com.contextflow.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.contextflow.entity.Position;

public interface PositionRepository extends JpaRepository<Position, Long> {

    Optional<Position> findByName(String name);

}

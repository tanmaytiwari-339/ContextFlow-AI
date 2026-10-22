
package com.contextflow.repository;

import com.contextflow.entity.Activity;
import com.contextflow.entity.User;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivityRepository extends JpaRepository<Activity, Long> {

    List<Activity> findByUserOrderByCreatedAtDesc(User user);

    List<Activity> findByUserAndActionInOrderByCreatedAtDesc(
            User user,
            List<String> actions
    );

    boolean existsByUser_Id(Long userId);
}

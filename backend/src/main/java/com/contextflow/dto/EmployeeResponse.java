package com.contextflow.dto;

import com.contextflow.entity.User;

public class EmployeeResponse {
    private Long id;
    private String employeeId;
    private String name;
    private String role;
    private String department;
    private String position;
    private boolean active;
    
    public EmployeeResponse(User user) {
        this.id = user.getId();
        this.employeeId = user.getEmployeeId();
        this.name = user.getName();
        this.role = user.getRole();
        this.active = user.isActive();

        if (user.getDepartment() != null) {
            this.department = user.getDepartment().getName();
        }

        if (user.getPosition() != null) {
            this.position = user.getPosition().getName();
        }
    }
    public Long getId() {
        return id;
    }

    public String getEmployeeId() {
        return employeeId;
    }

    public String getName() {
        return name;
    }

    public String getRole() {
        return role;
    }

    public String getDepartment() {
        return department;
    }

    public String getPosition() {
        return position;
    }
    public boolean isActive() {
        return active;
    }

}

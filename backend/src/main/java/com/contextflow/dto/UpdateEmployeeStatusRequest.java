package com.contextflow.dto;

public class UpdateEmployeeStatusRequest {
    private boolean active;

    public boolean isActive(){
        return active;
    }

    public void setActive(boolean active){
        this.active = active;
    }
    
}

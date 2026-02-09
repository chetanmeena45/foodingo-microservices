package com.foodingo.userservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse {
    private String message;
    private boolean success;
    private Object data;
    
    public static ApiResponse success(String message, Object data) {
        return new ApiResponse(message, true, data);
    }
    
    public static ApiResponse error(String message) {
        return new ApiResponse(message, false, null);
    }
}

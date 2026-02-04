package com.foodingo.userservice.dto;
import lombok.Data;

@Data
public class AuthResponse {
    private String token;
    private String message;
    private UserResponse user;
}

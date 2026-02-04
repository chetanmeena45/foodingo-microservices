package com.foodingo.userservice.service;

import com.foodingo.userservice.config.JwtUtil;
import com.foodingo.userservice.dto.*;
import com.foodingo.userservice.model.Role;
import com.foodingo.userservice.model.User;
import com.foodingo.userservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.USER);
        
        User savedUser = userRepository.save(user);
        String token = jwtUtil.generateToken(savedUser.getEmail(), savedUser.getRole().name());
        
        AuthResponse response = new AuthResponse();
        response.setToken(token);
        response.setMessage("Registration successful");
        response.setUser(mapToUserResponse(savedUser));
        return response;
    }
    
    public AuthResponse login(AuthRequest request) {
        Optional<User> userOptional = userRepository.findByEmail(request.getEmail());
        if (userOptional.isEmpty() || !passwordEncoder.matches(request.getPassword(), userOptional.get().getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        
        User user = userOptional.get();
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
        
        AuthResponse response = new AuthResponse();
        response.setToken(token);
        response.setMessage("Login successful");
        response.setUser(mapToUserResponse(user));
        return response;
    }
    
    public UserResponse getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return mapToUserResponse(user);
    }
    
    private UserResponse mapToUserResponse(User user) {
        UserResponse response = new UserResponse();
        response.setId(user.getId());
        response.setName(user.getName());
        response.setEmail(user.getEmail());
        response.setRole(user.getRole().name());
        return response;
    }
}
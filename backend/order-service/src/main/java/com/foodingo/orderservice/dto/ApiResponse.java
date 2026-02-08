package com.foodingo.orderservice.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data @NoArgsConstructor @AllArgsConstructor
public class ApiResponse<T> {
    private String message; private boolean success; private T data;
    public static <T> ApiResponse<T> success(String message, T data) { return new ApiResponse<>(message, true, data); }
    public static <T> ApiResponse<T> error(String message) { return new ApiResponse<>(message, false, null); }
}

package com.foodingo.gateway.filter;

import com.foodingo.gateway.config.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

@Component
public class JwtAuthenticationFilter extends AbstractGatewayFilterFactory<JwtAuthenticationFilter.Config> {
    
    private final JwtUtil jwtUtil;
    
    public JwtAuthenticationFilter(JwtUtil jwtUtil) {
        super(Config.class);
        this.jwtUtil = jwtUtil;
    }
    
    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            ServerHttpRequest request = exchange.getRequest();
            
            if (isPublicEndpoint(request.getPath().toString())) {
                return chain.filter(exchange);
            }
            
            String authHeader = request.getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
            
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return onError(exchange, "No token provided", HttpStatus.UNAUTHORIZED);
            }
            
            String token = authHeader.substring(7);
            
            if (!jwtUtil.validateToken(token)) {
                return onError(exchange, "Invalid token", HttpStatus.UNAUTHORIZED);
            }
            
            String email = jwtUtil.extractEmail(token);
            String role = jwtUtil.extractRole(token);
            
            ServerHttpRequest modifiedRequest = request.mutate()
                    .header("X-User-Email", email)
                    .header("X-User-Role", role)
                    .build();
            
            return chain.filter(exchange.mutate().request(modifiedRequest).build());
        };
    }
    
    private boolean isPublicEndpoint(String path) {
        return path.startsWith("/api/users/register") ||
               path.startsWith("/api/users/login") ||
               path.startsWith("/actuator") ||
               path.equals("/api/users/test") ||
               path.equals("/api/restaurants/test") ||
               path.equals("/api/orders/test");
    }
    
    private Mono<Void> onError(org.springframework.web.server.ServerWebExchange exchange, String err, HttpStatus status) {
        ServerHttpResponse response = exchange.getResponse();
        response.setStatusCode(status);
        return response.setComplete();
    }
    
    public static class Config {
    }
}

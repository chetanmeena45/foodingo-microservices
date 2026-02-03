package com.foodingo.restuarant_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class RestuarantServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(RestuarantServiceApplication.class, args);
		 System.out.println("✅ Restaurant Service is running on http://localhost:8082");
        System.out.println("📚 Swagger UI: http://localhost:8082/api/restaurants/swagger-ui.html");
	}

}

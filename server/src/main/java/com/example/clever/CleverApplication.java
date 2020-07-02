/*
 */
package com.example.clever;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

/**
*Класс CleverApplication.
* @since 1.0
*/
@SuppressWarnings("PMD")
@SpringBootApplication
@EnableJpaAuditing
public class CleverApplication {
    public static void main(final String[] args) {
        SpringApplication.run(CleverApplication.class, args);
    }

}

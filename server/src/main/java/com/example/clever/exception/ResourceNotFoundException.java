/*
 */
package com.example.clever.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
*Kласс для создания исключения в
*случае ошибки.
* @since 1.0
*/
@ResponseStatus(HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {
    /**
    *Метод для выдачи исключения с
    *сообщением.
    *@param message сообщение
    */
    public ResourceNotFoundException(final String message) {
        super(message);
    }

    /**
    *Метод для выдачи исключения с
    *сообщением и причиной.
    *@param message сообщение
    *@param cause причина
    */
    public ResourceNotFoundException(final String message,
                                     final Throwable cause) {
        super(message, cause);
    }
}

/*
 */
package com.example.clever.model;

/**
*Kласс для создания сообщений об
*ошибках при регистрации.
* @since 1.0
*/
public class MessageModel {
    private String message;

    /**
    *Конструктор для класс MessageModel.
    *@param message сообщение.
    */
    public MessageModel(final String message) {
        this.message = message;
    }

    /**
     *Метод получения сообщения {@link String#message}.
     *
     *@return Возвращает сообщение
     */
    public String getMessage() {
        return this.message;
    }

    /**
     *Метод определения сообщения {@link String#message}.
     *
     *@param messagel Сообщение
     */
    public void setMessage(final String messagel) {
        this.message = messagel;
    }
}

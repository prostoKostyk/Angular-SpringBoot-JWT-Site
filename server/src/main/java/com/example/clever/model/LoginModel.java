/*
 */
package com.example.clever.model;

import javax.validation.constraints.NotBlank;

/**
*Kласс для получения и определения полей
*логин и пароль пользователя при аутентификации.
* @since 1.0
*/
public class LoginModel {
    /**
    *Поле Логин пользователя.
    */
    @NotBlank
    private String username;

    /**
    *Поле Пароль пользователя.
    */
    @NotBlank
    private String password;

    /**
     *Метод получения значения поля {@link String#username}.
     *
     *@return
     *Возвращает логин пользователя.
     */
    public String getUsername() {
        return this.username;
    }

    /**
     *Метод определения поля Логин
     *пользователя {@link String#username}.
     *
     *@param usernamel
     *Логин пользователя.
     */
    public void setUsername(final String usernamel) {
        this.username = usernamel;
    }

    /**
     *Метод получения значения поля {@link String#password}.
     *
     *@return
     *Возвращает пароль.
     */
    public String getPassword() {
        return this.password;
    }

    /**
     *Метод определения поля пароль {@link String#password}.
     *
     *@param passwordl
     *Пароль.
     */
    public void setPassword(final String passwordl) {
        this.password = passwordl;
    }
}

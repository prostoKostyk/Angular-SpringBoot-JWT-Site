/*
 */
package com.example.clever.model;

import java.util.List;
import javax.persistence.Column;

/**
*Kласс для получения данных
*пользователя при авторизации.
* @since 1.0
*/
public class AuthModel {
    /**
    *Поле Токен.
    */
    private String accesstoken;

    /**
    *Поле id пользователя.
    */
    private Long id;

    /**
    *Поле Имя пользователя.
    */
    @Column(name = "first_name")
    private String firstname;

    /**
    *Поле Фамилия пользователя.
    */
    @Column(name = "second_name")
    private String secondname;

    /**
    *Поле Отчество пользователя.
    */
    @Column(name = "last_name")
    private String lastname;

    /**
    *Поле Телефонный номер пользователя.
    */
    @Column(name = "phone_number")
    private String phonenumber;

    /**
    *Поле Лoгин пользователя.
    */
    private String username;

    /**
    *Поле Email пользователя.
    */
    private String email;

    /**
    *Роли пользователя.
    */
    private final List<String> roles;

    /**
     *Конструктор для класса AuthModel.
     *@param accesstoken Токен
     *@param id id пользователя.
     *@param username Лoгин пользователя.
     *@param firstname Имя пользователя.
     *@param secondname Фамилия пользователя.
     *@param lastname Отчество пользователя.
     *@param phonenumber Телефонный номер пользователя.
     *@param email Email пользователя.
     *пользователя.
     *@param roles Роли пользователя.
     */
    public AuthModel(final String accesstoken,
                        final Long id,
                        final String username,
                        final String firstname,
                        final String secondname,
                        final String lastname,
                        final String phonenumber,
                        final String email,
                        final List<String> roles) {
        this.accesstoken = accesstoken;
        this.id = id;
        this.username = username;
        this.firstname = firstname;
        this.secondname = secondname;
        this.lastname = lastname;
        this.phonenumber = phonenumber;
        this.email = email;
        this.roles = roles;
    }

    /**
    *Метод получения значения поля {@link String#accesstoken}.
    *@return Возвращает accesstoken
    */
    public String getAccessToken() {
        return this.accesstoken;
    }

    /**
    *Метод определения поля accesstoken {@link String#accesstoken}.
    *
    *@param accesstokenl accesstoken
    */
    public void setAccessToken(final String accesstokenl) {
        this.accesstoken = accesstokenl;
    }

    /**
    *Метод получения значения поля id
    *пользователя {@link long#id}.
    *
    *@return Возвращает id пользователя
    */
    public Long getId() {
        return this.id;
    }

    /**
    *Метод определения поля id пользователя {@link long#id}.
    *
    *@param idl Id пользователя
    */
    public void setId(final Long idl) {
        this.id = idl;
    }

    /**
    *Метод получения значения поля Имя
    *пользователя {@link String#firstname}.
    *
    *@return Возвращает имя пользователя
    */
    public String getfirstname() {
        return this.firstname;
    }

    /**
    *Метод определения поля Имя пользователя
    *{@link String#firstname}.
    *
    *@param firstnamel Имя пользователя
    */
    public void setfirstname(final String firstnamel) {
        this.firstname = firstnamel;
    }

    /**
    *Метод получения значения поля firstname
    *пользователя {@link String#secondname}.
    *
    *@return Возвращает фамилию пользователя.
    */
    public String getsecondname() {
        return this.secondname;
    }

    /**
    *Метод определения поля secondname
    *пользователя {@link String#secondname}.
    *
    *@param secondnamel Фамилия пользователя
    */
    public void setsecondname(final String secondnamel) {
        this.secondname = secondnamel;
    }

    /**
    *Метод получения значения поля lastname
    *пользователя {@link String#lastname}.
    *
    *@return Возвращает отчество пользователя
    */
    public String getlastname() {
        return this.lastname;
    }

    /**
    *Метод определения поля lastname
    *пользователя {@link String#lastname}.
    *
    *@param lastnamel Отчество пользователя
    */
    public void setlastname(final String lastnamel) {
        this.lastname = lastnamel;
    }

    /**
    *Метод получения значения поля phonenumber
    *пользователя {@link String#phonenumber}.
    *
    *@return Возвращает телефонный номер пользователя
    */
    public String getphonenumber() {
        return this.phonenumber;
    }

    /**
    *Метод определения поля phonenumber
    *пользователя {@link String#phonenumber}.
    *
    *@param phonenumberl Телефонный номер пользователя
    */
    public void setphonenumber(final String phonenumberl) {
        this.phonenumber = phonenumberl;
    }

    /**
    *Метод получения значения поля
    *email пользователя {@link String#email}.
    *
    *@return Возвращает email пользователя
    */
    public String getEmail() {
        return this.email;
    }

    /**
    *Метод определения поля email
    *пользователя {@link String#email}.
    *
    *@param emaill Email пользователя.
    */
    public void setEmail(final String emaill) {
        this.email = emaill;
    }

    /**
    *Метод получения значения поля
    *логин пользователя {@link String#username}.
    *
    *@return Возвращает логин пользователя
    */
    public String getUsername() {
        return this.username;
    }

    /**
    *Метод определения поля логин
    *пользователя {@link String#username}.
    *
    *@param usernamel Логин пользователя
    */
    public void setUsername(final String usernamel) {
        this.username = usernamel;
    }

    /**
    *Метод получения значения поля
    *roles пользователя {@link RoleModel#roles}.
    *
    *@return Возвращает roles пользователя
    */
    public List<String> getRoles() {
        return this.roles;
    }
}


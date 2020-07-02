/*
 */
package com.example.clever.model;

import java.util.Set;
import javax.persistence.Column;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

/**
*Kласс получения и записи полей таблицы
*Пользователи при регистрации.
* @since 1.0
*/
public class SignupModel {
    /**
    *Поле Логин пользователя.
    */
    @NotBlank
    private String username;

    /**
    *Поле Имя пользователя.
    */
    @NotBlank
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
    *Поле Телфонный номер пользователя.
    */
    @Column(name = "phone_number")
    private String phonenumber;

    /**
    *Поле Email пользователя.
    */
    @NotBlank
    @Email
    private String email;

    /**
    *Поле Роли пользователя.
    */
    private Set<String> role;

    /**
    *Поле Пароль пользователя.
    */
    @NotBlank
    private String password;

    /**
     *Метод получения значения поля {@link String#username}.
     *
     *@return
     *Возвращает логин нового пользователя.
     */
    public String getUsername() {
        return this.username;
    }

    /**
     *Метод определения поля
     *id нового пользователя {@link String#username}.
     *
     *@param usernamel
     *Поле логин нового пользователя.
     */
    public void setUsername(final String usernamel) {
        this.username = usernamel;
    }

    /**
     *Метод получения значения поля {@link String#firstname}.
     *
     *@return
     *Возвращает имя нового пользователя.
     */
    public String getfirstname() {
        return this.firstname;
    }

    /**
     *Метод определения поля имя нового
     *пользователя {@link String#firstname}.
     *
     *@param firstnamel
     *Поле имя нового пользователя.
     */
    public void setfirstname(final String firstnamel) {
        this.firstname = firstnamel;
    }

    /**
     *Метод получения значения поля {@link String#firstname}.
     *
     *@return
     *Возвращает фамилию нового пользователя.
     */
    public String getsecondname() {
        return this.secondname;
    }

    /**
     *Метод определения поля фамилия нового
     *пользователя, {@link String#secondname}.
     *
     *@param secondnamel
     *Поле фамилия нового пользователя.
     */
    public void setsecondname(final String secondnamel) {
        this.secondname = secondnamel;
    }

    /**
     *Метод получения значения поля {@link String#lastname}.
     *
     *@return
     *Возвращает отчество нового пользователя.
     */
    public String getlastname() {
        return this.lastname;
    }

    /**
     *Метод определения поля отчество нового
     *пользователя, {@link String#lastname}.
     *
     *@param lastnamel
     *Поле отчество нового пользователя.
     */
    public void setlastname(final String lastnamel) {
        this.lastname = lastnamel;
    }

    /**
     *Метод получения значения поля {@link String#phonenumber}.
     *
     *@return
     *Возвращает телефонный номер нового пользователя.
     */
    public String getphonenumber() {
        return this.phonenumber;
    }

    /**
     *Метод определения поля телефонный номер
     *нового пользователя, {@link String#phonenumber}.
     *
     *@param phonenumberl
     *Поле телефонный номер нового пользователя.
     */
    public void setphonenumber(final String phonenumberl) {
        this.phonenumber = phonenumberl;
    }

    /**
     *Метод получения значения поля {@link String#email}.
     *
     *@return
     *Возвращает телефонный номер нового пользователя.
     */
    public String getEmail() {
        return this.email;
    }

    /**
     *Метод определения поля телефонный номер
     *нового пользователя, {@link String#email}.
     *
     *@param emaill
     *Телефонный номер нового пользователя.
     */
    public void setEmail(final String emaill) {
        this.email = emaill;
    }

    /**
     *Метод получения значения поля {@link String#firstname}.
     *
     *@return
     *Возвращает пароль нового пользователя.
     */
    public String getPassword() {
        return this.password;
    }

    /**
     *Метод определения поля пароль нового пользователя,
     *{@link String#password}.
     *
     *@param passwordl
     *Поле пароль нового пользователя.
     */
    public void setPassword(final String passwordl) {
        this.password = passwordl;
    }

    /**
     *Метод получения значения поля {@link String#role}.
     *
     *@return
     *Возвращает Роль нового пользователя.
     */
    public Set<String> getRole() {
        return this.role;
    }

    /**
     *Метод определения поля Роль нового
     *пользователя {@link String#role}.
     *
     *@param rolel
     *Роль нового пользователя.
     */
    public void setRole(final Set<String> rolel) {
        this.role = rolel;
    }
}

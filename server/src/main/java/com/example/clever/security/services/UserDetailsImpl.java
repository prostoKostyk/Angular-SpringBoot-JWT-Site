/*
 */
package com.example.clever.security.services;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.Collection;
import java.util.Objects;
import javax.persistence.Column;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

/**
*Класс реализующий UserDetails.
*Используется для получения данных
*пользователя после аутентификации.
* @since 1.0
*/
public final class UserDetailsImpl implements UserDetails {

    /**
    *Поле id пользователя.
    */
    private final Long id;

    /**
    *Поле логин пользователя.
    */
    private final String username;

    /**
    *Поле имя пользователя.
    */
    @Column(name = "first_name")
    private final String firstname;

    /**
    *Поле фамилия пользователя.
    */
    @Column(name = "second_name")
    private final String secondname;

    /**
    *Поле отчество пользователя.
    */
    @Column(name = "last_name")
    private final String lastname;

    /**
    *Поле email пользователя.
    */
    private final String email;

    /**
    *Поле номер телефона пользователя.
    */
    @Column(name = "phone_number")
    private final String phonenumber;

    /**
    *Поле пароль пользователя.
    */
    @JsonIgnore
    private final String password;

    /**
    *Поле роли пользователя.
    */
    private final Collection<? extends GrantedAuthority> authorities;

    /**
    *Конструктор для класса UserDetailsImpl.
    *@param id id пользователя
    *@param username логин пользователя
    *@param firstname имя пользователя
    *@param secondname фамилия пользователя
    *@param lastname отчество пользователя
    *@param phonenumber телефонный номер пользователя
    *@param email email пользователя
    *@param password пароль пользователя
    *@param authorities роли пользователя
    */
    public UserDetailsImpl(final long id,
                           final String username,
                           final String firstname,
                           final String secondname,
                           final String lastname,
                           final String phonenumber,
                           final String email,
                           final String password,
                           final Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.username = username;
        this.firstname = firstname;
        this.secondname = secondname;
        this.lastname = lastname;
        this.email = email;
        this.phonenumber = phonenumber;
        this.password = password;
        this.authorities = authorities;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    /**
     *Метод получения значения поля
     *id пользователя {@link Long#id}.
     *
     *@return Возвращает id пользователя
     */
    public Long getId() {
        return this.id;
    }

    /**
     *Метод получения значения поля firstname
     *пользователя {@link String#firstname}.
     *
     *@return Возвращает firstname пользователя
     */
    public String getfirstname() {
        return this.firstname;
    }

    /**
    *Метод получения значения поля firstname
    *пользователя {@link String#secondname}.
    *
    *@return Возвращает secondname пользователя
    */
    public String getsecondname() {
        return this.secondname;
    }

    /**
    *Метод получения значения поля lastname
    *пользователя {@link String#lastname}.
    *
    *@return Возвращает lastname пользователя
    */
    public String getlastname() {
        return this.lastname;
    }

    /**
    *Метод получения значения поля email
    *пользователя {@link String#email}.
    *
    *@return Возвращает email пользователя
    */
    public String getEmail() {
        return this.email;
    }

    /**
    *Метод получения значения поля phonenumber пользователя
    *{@link String#phonenumber}.
    *
    *@return Возвращает phonenumber пользователя
    */
    public String getphonenumber() {
        return this.phonenumber;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean equals(final Object object) {
        final boolean equal;
        if (this == object) {
            equal = true;
        } else if (object == null || getClass() != object.getClass()) {
            equal = false;
        } else {
            final UserDetailsImpl user = (UserDetailsImpl) object;
            equal = Objects.equals(this.id, user.id);
        }
        return equal;
    }
}

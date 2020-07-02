/*
 */
package com.example.clever.model;

import java.util.Date;
import java.util.UUID;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
*Kласс получения и записи полей таблицы
*Tokens при восстановлении пароля.
* @since 1.0
*/
@Entity
public class ConfirmationToken {
    /**
    *Поле id токена.
    */
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "token_id")
    private long tokenid;

    /**
    *Поле Токен.
    */
    @Column(name = "confirmation_token")
    private String confirmationToken;

    /**
    *Поле Дата создания токена.
    */
    @Column(name = "created_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdDate;

    /**
    *Пользователь, для которого создан токен.
    */
    @OneToOne(targetEntity = UserModel.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "user_id")
    private UserModel user;

    public ConfirmationToken() {}

    /**
    *Конструктор для класса ConfirmationToken.
    *@param user Данные пользователя.
    */
    public ConfirmationToken(final UserModel user) {
        this.user = user;
        this.createdDate = new Date();
        this.confirmationToken = UUID.randomUUID().toString();
    }

    /**
     *Метод получения значения поля {@link String#confirmationToken}.
     *
     *@return
     *Возвращает токен для восстановления пароля.
     */
    public String getConfirmationToken() {
        return this.confirmationToken;
    }

    /**
     *Метод определения поля Токен для
     *восстановления пароля {@link String#confirmationToken}.
     *
     *@param confirmationTokenl
     *Поле токен для восстановлления пароля.
     */
    public void setConfirmationToken(final String confirmationTokenl) {
        this.confirmationToken = confirmationTokenl;
    }

    /**
     *Метод получения значения поля {@link Date#getCreatedDate}.
     *
     *@return Возвращает дату создания токена
     *для восстановления пароля.
     */
    public Date getCreatedDate() {
        return this.createdDate;
    }

    /**
     *Метод определения поля Дата создания токена,
     *{@link Date#createdDate}.
     *
     *@param createdDatel
     *Поле дата создания токена.
     */
    public void setCreatedDate(final Date createdDatel) {
        this.createdDate = createdDatel;
    }

    /**
     *Метод получения значения поля {@link UserModel#user}.
     *
     *@return Возвращает пользователя, для которого
     *действует токен для восстановления пароля.
     */
    public UserModel getUser() {
        return this.user;
    }

    /**
     *Метод определения пользователя, для которого
     *действует токен для восстановления пароля.
     *
     *@param userl
     *Поле дата создания токена.
     */
    public void setUser(final UserModel userl) {
        this.user = userl;
    }

    /**
     *Метод получения значения поля {@link long#tokenid}.
     *
     *@return
     *Возвращает id токена.
     */
    public long getTokenid() {
        return this.tokenid;
    }

    /**
     *Метод определения поля id токена {@link long#tokenid}.
     *
     *@param tokenidl
     *Поле id токена.
     */
    public void setTokenid(final long tokenidl) {
        this.tokenid = tokenidl;
    }
}

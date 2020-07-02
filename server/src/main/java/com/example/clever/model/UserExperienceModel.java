/*
 */
package com.example.clever.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
*Kласс получения и записи полей
* отношения пользователь-опыт.
* @since 1.0
*/
@Entity
@Table(name = "users_experience")
public final class UserExperienceModel {
    /**
    *Поле Id опыта.
    */
    @Id
    @Column(name = "experience_id")
    private long experienceid;

    /**
    *Поле Id пользователя.
    */
    @Column(name = "user_id")
    private long userid;

    /**
     *Метод получения значения
     *поля {@link long#experienceid}.
     *
     *@return
     *Возвращает experienceid.
     */
    public long getExperienceId() {
        return this.experienceid;
    }

    /**
     *Метод определения поля
     *experienceid проекта {@link long#experienceid}.
     *
     *@param experienceidl
     *Поле experienceid.
     */
    public void setExperienceId(final long experienceidl) {
        this.experienceid = experienceidl;
    }

    /**
     *Метод получения значения
     *поля {@link long#userid}.
     *
     *@return
     *Возвращает userid.
     */
    public long getUserid() {
        return this.userid;
    }

    /**
     *Метод определения поля
     *userid проекта {@link long#userid}.
     *
     *@param useridl
     *Поле userid.
     */
    public void setUserid(final long useridl) {
        this.userid = useridl;
    }

}
